import { Test, TestingModule } from '@nestjs/testing';
import { FoodThumbnailController } from './food-thumbnail.controller';
import { FoodThumbnailService } from './food-thumbnail.service';

describe('FoodThumbnailController', () => {
  let controller: FoodThumbnailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodThumbnailController],
      providers: [FoodThumbnailService],
    }).compile();

    controller = module.get<FoodThumbnailController>(FoodThumbnailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
