import { PartialType } from '@nestjs/mapped-types';
import { CreateCalorieDictionaryDto } from './create-calorie-dictionary.dto';

export class UpdateCalorieDictionaryDto extends PartialType(CreateCalorieDictionaryDto) {}
