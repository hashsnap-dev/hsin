import { Test, TestingModule } from '@nestjs/testing';
import { FalseAdvertisingService } from './false-advertising.service';

describe('FalseAdvertisingService', () => {
  let service: FalseAdvertisingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FalseAdvertisingService],
    }).compile();

    service = module.get<FalseAdvertisingService>(FalseAdvertisingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
