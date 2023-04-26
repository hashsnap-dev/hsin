import { Test, TestingModule } from '@nestjs/testing';
import { FoodUrlService } from './food-url.service';

describe('FoodUrlService', () => {
  let service: FoodUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodUrlService],
    }).compile();

    service = module.get<FoodUrlService>(FoodUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
