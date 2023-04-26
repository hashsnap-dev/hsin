import { Test, TestingModule } from '@nestjs/testing';
import { EatTogetherService } from './eat-together.service';

describe('EatTogetherService', () => {
  let service: EatTogetherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EatTogetherService],
    }).compile();

    service = module.get<EatTogetherService>(EatTogetherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
