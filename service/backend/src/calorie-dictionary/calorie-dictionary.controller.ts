import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { FindInterceptor } from 'src/interceptors/find.interceptor';
import { CalorieDictionaryService } from './calorie-dictionary.service';
import { CreateCalorieDictionaryDto } from './dto/create-calorie-dictionary.dto';
import { UpdateCalorieDictionaryDto } from './dto/update-calorie-dictionary.dto';

@Controller('calorie-dictionary')
export class CalorieDictionaryController {
  constructor(
    private readonly calorieDictionaryService: CalorieDictionaryService,
  ) {}

  @Post()
  create(@Body() createCalorieDictionaryDto: CreateCalorieDictionaryDto) {
    return this.calorieDictionaryService.create(createCalorieDictionaryDto);
  }

  @Get()
  @UseInterceptors(FindInterceptor)
  findAll(
    @Query('page', ParseIntPipe) page: number,
    // @Query('limit', ParseIntPipe) limit: number,
    @Query('query') query: string,
  ) {
    return this.calorieDictionaryService.findAll({ page, query });
  }
  @Get('count')
  count(
    @Query('page', ParseIntPipe) page: number,
    @Query('query') query: string,
  ) {
    return this.calorieDictionaryService.count({ page, query });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calorieDictionaryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalorieDictionaryDto: UpdateCalorieDictionaryDto,
  ) {
    return this.calorieDictionaryService.update(
      +id,
      updateCalorieDictionaryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calorieDictionaryService.remove(+id);
  }
}
