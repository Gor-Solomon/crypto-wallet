import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
