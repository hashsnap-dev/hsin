import { Test, TestingModule } from '@nestjs/testing';
import { ForeignBlockService } from './foreign-block.service';

describe('ForeignBlockService', () => {
  let service: ForeignBlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForeignBlockService],
    }).compile();

    service = module.get<ForeignBlockService>(ForeignBlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
