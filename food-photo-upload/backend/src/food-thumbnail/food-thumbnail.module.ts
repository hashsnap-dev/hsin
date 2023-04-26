import { Module } from '@nestjs/common';
import { FoodThumbnailService } from './food-thumbnail.service';
import { FoodThumbnailController } from './food-thumbnail.controller';
import { EscapeService } from 'src/escape/escape.service';

@Module({
  controllers: [FoodThumbnailController],
  providers: [FoodThumbnailService, EscapeService],
})
export class FoodThumbnailModule {}
