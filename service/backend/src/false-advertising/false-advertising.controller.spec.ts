import { Test, TestingModule } from '@nestjs/testing';
import { FalseAdvertisingController } from './false-advertising.controller';
import { FalseAdvertisingService } from './false-advertising.service';

describe('FalseAdvertisingController', () => {
  let controller: FalseAdvertisingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FalseAdvertisingController],
      providers: [FalseAdvertisingService],
    }).compile();

    controller = module.get<FalseAdvertisingController>(
      FalseAdvertisingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
