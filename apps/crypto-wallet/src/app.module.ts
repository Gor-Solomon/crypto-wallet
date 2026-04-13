import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    EventEmitterModule.forRoot(), // <-- Add this to imports
    // We are mocking the RabbitMQ connection here using local TCP
    ClientsModule.register([
      { 
        name: 'RABBIT_MQ_MOCK', 
        transport: Transport.TCP, 
        options: { port: 3001 } // Must match the worker's port!
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
