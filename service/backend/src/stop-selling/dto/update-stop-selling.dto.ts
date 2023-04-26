import { PartialType } from '@nestjs/mapped-types';
import { CreateStopSellingDto } from './create-stop-selling.dto';

export class UpdateStopSellingDto extends PartialType(CreateStopSellingDto) {}
