import { Test, TestingModule } from '@nestjs/testing';
import { ForeignBlockController } from './foreign-block.controller';
import { ForeignBlockService } from './foreign-block.service';

describe('ForeignBlockController', () => {
  let controller: ForeignBlockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForeignBlockController],
      providers: [ForeignBlockService],
    }).compile();

    controller = module.get<ForeignBlockController>(ForeignBlockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
