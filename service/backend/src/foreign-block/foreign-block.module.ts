import { Module } from '@nestjs/common';
import { ForeignBlockService } from './foreign-block.service';
import { ForeignBlockController } from './foreign-block.controller';

@Module({
  controllers: [ForeignBlockController],
  providers: [ForeignBlockService]
})
export class ForeignBlockModule {}
