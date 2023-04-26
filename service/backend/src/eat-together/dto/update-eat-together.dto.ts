import { PartialType } from '@nestjs/mapped-types';
import { CreateEatTogetherDto } from './create-eat-together.dto';

export class UpdateEatTogetherDto extends PartialType(CreateEatTogetherDto) {}
