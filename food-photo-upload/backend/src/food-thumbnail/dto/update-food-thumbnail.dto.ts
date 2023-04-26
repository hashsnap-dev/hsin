import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodThumbnailDto } from './create-food-thumbnail.dto';

export class UpdateFoodThumbnailDto extends PartialType(
  CreateFoodThumbnailDto,
) {}
