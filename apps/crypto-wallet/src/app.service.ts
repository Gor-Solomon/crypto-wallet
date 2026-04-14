import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// 1. Import your Entity and Data Service from your new library!
import { WalletEntity, WalletDataService } from '@app/database'; 

@Injectable() 
export class AppService {
  constructor(
    // 2. Inject your Data Layer (Replaces the fake array)
    private readonly walletData: WalletDataService,
    
    // 3. Keep your RabbitMQ mock
    @Inject('RABBIT_MQ_MOCK') private messageBroker: ClientProxy
  ) {}

  // Accept the raw parameters
  async createWallet(userId: string, balance: number): Promise<WalletEntity> {
    
    // Pass them directly to the data layer
    return await this.walletData.createWallet(userId, balance);
  }

  async getWallet(id: string): Promise<WalletEntity> {
    // Swap LINQ .find() for the database query
    const wallet = await this.walletData.getWalletById(id); 
    
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`); 
    }
    
    return wallet;
  }

  async processTransaction(walletId: string, amount: number, destination: string): Promise<WalletEntity> {
    // Reuses your async getWallet method
    const wallet = await this.getWallet(walletId); 

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    // Update the balance (Casting to Number because Postgres decimals sometimes return as strings)
    wallet.balance = Number(wallet.balance) - amount;
    
    // 4. SAVE the new balance securely to PostgreSQL!
    await this.walletData.saveWallet(wallet);
    
    // 5. Fire the event to the background worker
    this.messageBroker.emit('transaction.created', {
      walletId, amount, destination
    });
    
    console.log(`Sent ${amount} to ${destination}. New balance: ${wallet.balance}`);

    return wallet;
  }
}