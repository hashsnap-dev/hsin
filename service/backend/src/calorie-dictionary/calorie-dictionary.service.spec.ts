import { Test, TestingModule } from '@nestjs/testing';
import { CalorieDictionaryService } from './calorie-dictionary.service';

describe('CalorieDictionaryService', () => {
  let service: CalorieDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalorieDictionaryService],
    }).compile();

    service = module.get<CalorieDictionaryService>(CalorieDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
