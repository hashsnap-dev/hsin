import { Test, TestingModule } from '@nestjs/testing';
import { StopSellingController } from './stop-selling.controller';
import { StopSellingService } from './stop-selling.service';

describe('StopSellingController', () => {
  let controller: StopSellingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StopSellingController],
      providers: [StopSellingService],
    }).compile();

    controller = module.get<StopSellingController>(StopSellingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
