import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, Wallet } from './app.service';
import { CreateTransactionDto } from '@app/shared-contracts';


@Controller('wallets') // Maps to /wallets (Like [Route("api/[controller]")] in C#)
export class AppController {
  
  // Constructor injection! Exactly like C#
  constructor(private readonly appService: AppService) {}

  @Post() // Like [HttpPost]
  createWallet(@Body('userId') userId: string, @Body('balance') balance: number = 0): Wallet {
    // @Body reads from the JSON request body (Like [FromBody])
    return this.appService.createWallet(userId, balance);
  }

  @Get(':id') // Like [HttpGet("{id}")]
  getWallet(@Param('id') id: string): Wallet {
    // @Param reads from the URL route (Like [FromRoute])
    return this.appService.getWallet(id);
  }

  @Post(':id/transactions') // Route: POST /wallets/{id}/transactions
  sendCrypto(
    @Param('id') walletId: string,
    @Body() transactionDto: CreateTransactionDto // NestJS automatically validates this!
  ): Wallet {
    return this.appService.processTransaction(
      walletId, 
      transactionDto.amount, 
      transactionDto.destinationAddress
    );
  }
  
}