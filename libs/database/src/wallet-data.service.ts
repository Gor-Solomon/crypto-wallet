import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletDataService {
  constructor(
    // We inject the raw TypeORM repository HERE, hidden from the main API
    @InjectRepository(WalletEntity)
    private readonly walletRepo: Repository<WalletEntity>,
  ) {}

  // Accept the raw parameters here too
  async createWallet(userId: string, balance: number): Promise<WalletEntity> {
    
    // TypeORM builds the entity in memory. It ignores the missing id/createdAt.
    const newWallet = this.walletRepo.create({ 
      userId: userId, 
      balance: balance 
    });
    
    // When you call .save(), it runs the INSERT, Postgres generates the UUID and Date, 
    // and TypeORM returns the FULL, completed object back to you!
    return await this.walletRepo.save(newWallet);
  }

  async getWalletById(id: string): Promise<WalletEntity | null> {
    return await this.walletRepo.findOne({ where: { id } });
  }

  async saveWallet(wallet: WalletEntity): Promise<WalletEntity> {
    return await this.walletRepo.save(wallet);
  }
}