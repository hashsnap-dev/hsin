import { Module } from '@nestjs/common';
import { FoodUrlService } from './food-url.service';
import { FoodUrlController } from './food-url.controller';

@Module({
  controllers: [FoodUrlController],
  providers: [FoodUrlService],
})
export class FoodUrlModule {}
