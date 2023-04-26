import { Module } from '@nestjs/common';
import { FalseAdvertisingService } from './false-advertising.service';
import { FalseAdvertisingController } from './false-advertising.controller';

@Module({
  controllers: [FalseAdvertisingController],
  providers: [FalseAdvertisingService],
})
export class FalseAdvertisingModule {}
