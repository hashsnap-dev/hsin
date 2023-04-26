import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodUrlDto } from './create-food-url.dto';

export class UpdateFoodUrlDto extends PartialType(CreateFoodUrlDto) {}
