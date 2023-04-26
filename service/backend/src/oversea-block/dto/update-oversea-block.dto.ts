import { PartialType } from '@nestjs/mapped-types';
import { CreateOverseaBlockDto } from './create-oversea-block.dto';

export class UpdateOverseaBlockDto extends PartialType(CreateOverseaBlockDto) {}
