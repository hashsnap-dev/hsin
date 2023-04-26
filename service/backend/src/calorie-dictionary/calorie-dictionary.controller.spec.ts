import { Test, TestingModule } from '@nestjs/testing';
import { CalorieDictionaryController } from './calorie-dictionary.controller';
import { CalorieDictionaryService } from './calorie-dictionary.service';

describe('CalorieDictionaryController', () => {
  let controller: CalorieDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalorieDictionaryController],
      providers: [CalorieDictionaryService],
    }).compile();

    controller = module.get<CalorieDictionaryController>(CalorieDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
