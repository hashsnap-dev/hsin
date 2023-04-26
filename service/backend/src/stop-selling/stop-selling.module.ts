import { Module } from '@nestjs/common';
import { StopSellingService } from './stop-selling.service';
import { StopSellingController } from './stop-selling.controller';

@Module({
  controllers: [StopSellingController],
  providers: [StopSellingService]
})
export class StopSellingModule {}
