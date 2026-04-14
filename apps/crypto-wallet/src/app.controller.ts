import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTransactionDto } from '@app/shared-contracts';
import { WalletEntity } from '@app/database'; // Import the Entity here too

@Controller('wallets')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getWallet(@Param('id') walletId: string): Promise<WalletEntity> {
    return await this.appService.getWallet(walletId);
  }

@Post()
  async createWallet(
    @Body('userId') userId: string, 
    @Body('balance') balance: number
  ): Promise<WalletEntity> {
    // If Postman doesn't send a balance, default it to 0
    const startingBalance = balance || 0; 
    
    // Pass them purely as arguments
    return await this.appService.createWallet(userId, startingBalance);
  }

  @Post(':id/transactions')
  async sendCrypto(
    @Param('id') walletId: string,
    @Body() transactionDto: CreateTransactionDto 
  ): Promise<WalletEntity> {
    return await this.appService.processTransaction(
      walletId, 
      transactionDto.amount, 
      transactionDto.destinationAddress
    );
  }
}