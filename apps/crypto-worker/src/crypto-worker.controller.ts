import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class CryptoWorkerController {
  
  // @EventPattern is the microservice version of @OnEvent!
  @EventPattern('transaction.created')
  handleTransaction(payload: any) {
    console.log('\n[BACKGROUND WORKER] 🚀 New Transaction Detected over TCP!');
    console.log(`[BACKGROUND WORKER] Sending ${payload.amount} to ${payload.destination}`);
    
    setTimeout(() => {
      console.log(`[BACKGROUND WORKER] ✅ Transaction to ${payload.destination} confirmed!\n`);
    }, 5000);
  }
}