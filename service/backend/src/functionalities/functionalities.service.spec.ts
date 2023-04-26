import { Test, TestingModule } from '@nestjs/testing';
import { FunctionalitiesService } from './functionalities.service';

describe('FunctionalitiesService', () => {
  let service: FunctionalitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunctionalitiesService],
    }).compile();

    service = module.get<FunctionalitiesService>(FunctionalitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
