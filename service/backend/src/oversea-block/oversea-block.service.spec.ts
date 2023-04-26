import { Test, TestingModule } from '@nestjs/testing';
import { OverseaBlockService } from './oversea-block.service';

describe('OverseaBlockService', () => {
  let service: OverseaBlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverseaBlockService],
    }).compile();

    service = module.get<OverseaBlockService>(OverseaBlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
