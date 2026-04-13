import { Module } from '@nestjs/common';
import { CryptoWorkerController } from './crypto-worker.controller';
import { CryptoWorkerService } from './crypto-worker.service';
import { TransactionListener } from './transaction.listener';

@Module({
  imports: [],
  controllers: [CryptoWorkerController],
  providers: [CryptoWorkerService, TransactionListener],
})
export class CryptoWorkerModule {}
