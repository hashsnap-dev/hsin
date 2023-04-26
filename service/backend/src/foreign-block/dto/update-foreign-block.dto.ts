import { PartialType } from '@nestjs/mapped-types';
import { CreateForeignBlockDto } from './create-foreign-block.dto';

export class UpdateForeignBlockDto extends PartialType(CreateForeignBlockDto) {}
