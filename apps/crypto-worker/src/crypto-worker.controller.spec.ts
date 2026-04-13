import { Test, TestingModule } from '@nestjs/testing';
import { CryptoWorkerController } from './crypto-worker.controller';
import { CryptoWorkerService } from './crypto-worker.service';

describe('CryptoWorkerController', () => {
  let cryptoWorkerController: CryptoWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CryptoWorkerController],
      providers: [CryptoWorkerService],
    }).compile();

    cryptoWorkerController = app.get<CryptoWorkerController>(CryptoWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cryptoWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
