import { Test, TestingModule } from '@nestjs/testing';
import { StopSellingService } from './stop-selling.service';

describe('StopSellingService', () => {
  let service: StopSellingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StopSellingService],
    }).compile();

    service = module.get<StopSellingService>(StopSellingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
