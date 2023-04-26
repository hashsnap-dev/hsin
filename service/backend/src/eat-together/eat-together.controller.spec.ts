import { Test, TestingModule } from '@nestjs/testing';
import { EatTogetherController } from './eat-together.controller';
import { EatTogetherService } from './eat-together.service';

describe('EatTogetherController', () => {
  let controller: EatTogetherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EatTogetherController],
      providers: [EatTogetherService],
    }).compile();

    controller = module.get<EatTogetherController>(EatTogetherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
