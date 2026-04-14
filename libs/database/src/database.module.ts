import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { WalletDataService } from './wallet-data.service';

@Module({
  // Register the entity here
  imports: [TypeOrmModule.forFeature([WalletEntity])], 
  // Provide the service
  providers: [WalletDataService],
  // EXPORT the service so your API project can use it!
  exports: [WalletDataService], 
})
export class DatabaseModule {}