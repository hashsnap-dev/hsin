import { PartialType } from '@nestjs/mapped-types';
import { CreateFalseAdvertisingDto } from './create-false-advertising.dto';

export class UpdateFalseAdvertisingDto extends PartialType(CreateFalseAdvertisingDto) {}
