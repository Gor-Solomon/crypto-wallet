import { NestFactory } from '@nestjs/core';
import { CryptoWorkerModule } from './crypto-worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // This tells NestJS: "Don't boot a web server. Boot a microservice on TCP port 3001"
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CryptoWorkerModule,
    {
      transport: Transport.TCP,
      options: { port: 3001 },
    },
  );
  await app.listen();
  
  console.log('👷 WORKER IS ALIVE AND LISTENING ON TCP 3001!');
}
bootstrap();