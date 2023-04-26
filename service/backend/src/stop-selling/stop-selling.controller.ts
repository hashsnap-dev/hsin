import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { StopSellingService } from './stop-selling.service';
import { CreateStopSellingDto } from './dto/create-stop-selling.dto';
import { UpdateStopSellingDto } from './dto/update-stop-selling.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('stop-selling')
@UseInterceptors(FindInterceptor)
export class StopSellingController {
  constructor(private readonly stopSellingService: StopSellingService) {}

  @Post()
  create(@Body() createStopSellingDto: CreateStopSellingDto) {
    return this.stopSellingService.create(createStopSellingDto);
  }

  @Get()
  findAll(
    @Query('page') page: string, 
    @Query('limit') limit: string,
    @Query('query') query: string,
    @Query('searchType') searchType: string,
  ) {
    return this.stopSellingService.findAll(page, limit, {query, searchType});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stopSellingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStopSellingDto: UpdateStopSellingDto) {
    return this.stopSellingService.update(+id, updateStopSellingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stopSellingService.remove(+id);
  }
}
