import { Injectable, NotFoundException, BadRequestException, Inject} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// Change 'interface' to 'class'
export class Wallet {
  constructor(
    public id: string,
    public userId: string,
    public balance: number
  ) {}
}

@Injectable() // Similar to registering a scoped/transient service in .NET DI
export class AppService {
  // Simulating our PostgreSQL database
  private wallets: Wallet[] = [];

// Inject the network client we just registered
  constructor(@Inject('RABBIT_MQ_MOCK') private messageBroker: ClientProxy) {}

  createWallet(userId: string, balance: number): Wallet {
    
    // We don't even have to pass the 0 for balance because it defaults to 0!
    const newWallet = new Wallet(Math.random().toString(36).substring(7), userId, balance);

    this.wallets.push(newWallet);

    return newWallet;
  }

  getWallet(id: string): Wallet {

    const wallet = this.wallets.find(w => w.id === id); // Like LINQ .FirstOrDefault()
    
    if (!wallet) {
      // NestJS has built-in HTTP exceptions just like C#
      throw new NotFoundException(`Wallet with ID ${id} not found`); 
    }
    
    return wallet;
  }

  processTransaction(walletId: string, amount: number, destination: string): Wallet {
    
    const wallet = this.getWallet(walletId); // Reuses your existing method

    if (wallet.balance < amount) {
      // Another built-in HTTP exception, returning a 400 Bad Request
      throw new BadRequestException('Insufficient funds');
    }

    wallet.balance -= amount;
    
    // FIRE THE EVENT OVER THE NETWORK!
    this.messageBroker.emit('transaction.created', {
      walletId, amount, destination
    });
    
    console.log(`Sent ${amount} to ${destination}. New balance: ${wallet.balance}`);

    return wallet;
  }

}