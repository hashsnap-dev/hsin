import { Test, TestingModule } from '@nestjs/testing';
import { OverseaBlockController } from './oversea-block.controller';
import { OverseaBlockService } from './oversea-block.service';

describe('OverseaBlockController', () => {
  let controller: OverseaBlockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverseaBlockController],
      providers: [OverseaBlockService],
    }).compile();

    controller = module.get<OverseaBlockController>(OverseaBlockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
