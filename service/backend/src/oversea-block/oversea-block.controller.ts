import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { OverseaBlockService } from './oversea-block.service';
import { CreateOverseaBlockDto } from './dto/create-oversea-block.dto';
import { UpdateOverseaBlockDto } from './dto/update-oversea-block.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('oversea-block')
@UseInterceptors(FindInterceptor)
export class OverseaBlockController {
  constructor(private readonly overseaBlockService: OverseaBlockService) {}

  @Post()
  create(@Body() createOverseaBlockDto: CreateOverseaBlockDto) {
    return this.overseaBlockService.create(createOverseaBlockDto);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('query') query: string,
    @Query('searchType') searchType: string,
    ) {
    return this.overseaBlockService.findAll(page, limit, {query, searchType});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.overseaBlockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOverseaBlockDto: UpdateOverseaBlockDto) {
    return this.overseaBlockService.update(+id, updateOverseaBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.overseaBlockService.remove(+id);
  }
}
