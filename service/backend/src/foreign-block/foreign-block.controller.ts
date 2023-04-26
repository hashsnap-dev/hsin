import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ForeignBlockService } from './foreign-block.service';
import { CreateForeignBlockDto } from './dto/create-foreign-block.dto';
import { UpdateForeignBlockDto } from './dto/update-foreign-block.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('foreign-block')
@UseInterceptors(FindInterceptor)
export class ForeignBlockController {
  constructor(private readonly foreignBlockService: ForeignBlockService) {}

  // @Post()
  // create(@Body() createForeignBlockDto: CreateForeignBlockDto) {
  //   return this.foreignBlockService.create(createForeignBlockDto);
  // }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('query') query: string,
    @Query('searchType') searchType: string,
  ) {
    return this.foreignBlockService.findAll(page, limit, { query, searchType });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foreignBlockService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateForeignBlockDto: UpdateForeignBlockDto) {
  //   return this.foreignBlockService.update(+id, updateForeignBlockDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.foreignBlockService.remove(+id);
  // }
}
