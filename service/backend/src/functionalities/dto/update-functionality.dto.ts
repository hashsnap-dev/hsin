import { PartialType } from '@nestjs/mapped-types';
import { CreateFunctionalityDto } from './create-functionality.dto';

export class UpdateFunctionalityDto extends PartialType(
  CreateFunctionalityDto,
) {}
