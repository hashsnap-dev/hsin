import { Test, TestingModule } from '@nestjs/testing';
import { FoodUrlController } from './food-url.controller';
import { FoodUrlService } from './food-url.service';

describe('FoodUrlController', () => {
  let controller: FoodUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodUrlController],
      providers: [FoodUrlService],
    }).compile();

    controller = module.get<FoodUrlController>(FoodUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
