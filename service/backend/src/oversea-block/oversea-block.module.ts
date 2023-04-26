import { Module } from '@nestjs/common';
import { OverseaBlockService } from './oversea-block.service';
import { OverseaBlockController } from './oversea-block.controller';

@Module({
  controllers: [OverseaBlockController],
  providers: [OverseaBlockService]
})
export class OverseaBlockModule {}
