import { Test, TestingModule } from '@nestjs/testing';
import { FunctionalitiesController } from './functionalities.controller';
import { FunctionalitiesService } from './functionalities.service';

describe('FunctionalitiesController', () => {
  let controller: FunctionalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunctionalitiesController],
      providers: [FunctionalitiesService],
    }).compile();

    controller = module.get<FunctionalitiesController>(
      FunctionalitiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
