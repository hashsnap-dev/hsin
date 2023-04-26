import { Test, TestingModule } from '@nestjs/testing';
import { FoodThumbnailService } from './food-thumbnail.service';

describe('FoodThumbnailService', () => {
  let service: FoodThumbnailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodThumbnailService],
    }).compile();

    service = module.get<FoodThumbnailService>(FoodThumbnailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
