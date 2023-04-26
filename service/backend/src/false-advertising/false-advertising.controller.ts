import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { FalseAdvertisingService } from './false-advertising.service';
import { CreateFalseAdvertisingDto } from './dto/create-false-advertising.dto';
import { UpdateFalseAdvertisingDto } from './dto/update-false-advertising.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('false-advertising')
@UseInterceptors(FindInterceptor)
export class FalseAdvertisingController {
  constructor(
    private readonly falseAdvertisingService: FalseAdvertisingService,
  ) {}

  @Post()
  create(@Body() createFalseAdvertisingDto: CreateFalseAdvertisingDto) {
    return this.falseAdvertisingService.create(createFalseAdvertisingDto);
  }

  @Get()
  findAll() {
    return this.falseAdvertisingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.falseAdvertisingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFalseAdvertisingDto: UpdateFalseAdvertisingDto,
  ) {
    return this.falseAdvertisingService.update(+id, updateFalseAdvertisingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.falseAdvertisingService.remove(+id);
  }
}
