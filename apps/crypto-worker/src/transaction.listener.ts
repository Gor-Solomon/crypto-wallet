import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TransactionListener {
  
  // This decorator tells NestJS to listen for our specific event
  @OnEvent('transaction.created')
  handleTransactionCreatedEvent(payload: any) {
    console.log('\n[BACKGROUND WORKER] 🚀 New Transaction Detected!');
    console.log(`[BACKGROUND WORKER] Preparing to send ${payload.amount} to the blockchain for address: ${payload.destination}`);
    
    // Simulate a slow blockchain process...
    setTimeout(() => {
      console.log(`[BACKGROUND WORKER] ✅ Transaction to ${payload.destination} confirmed on network!\n`);
    }, 5000); // 5 second delay

        // In a real app, you'd save to PostgreSQL and publish a RabbitMQ event here
    //nsole.log(`Sent ${amount} to ${destination}. New balance: ${wallet.balance}`);
    console.log(`Sent ${payload.amount} to ${payload.destination}. New balance: ${payload.wallet?.balance}`);
  }
}