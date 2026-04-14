import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/database'; // <-- Import your Data Layer!

@Module({
  imports: [
    ClientsModule.register([{ name: 'RABBIT_MQ_MOCK', transport: Transport.TCP, options: { port: 3001 } }]),
    
    // The main app still holds the connection string
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'supersecretpassword',
      database: 'citypay_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),

    DatabaseModule, // <-- Inject your clean Data Layer Module here!
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}