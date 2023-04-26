import { Module } from '@nestjs/common';
import { EatTogetherService } from './eat-together.service';
import { EatTogetherController } from './eat-together.controller';

@Module({
  controllers: [EatTogetherController],
  providers: [EatTogetherService]
})
export class EatTogetherModule {}
