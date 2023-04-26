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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialType } from './dto/material.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  // @Post()
  // create(@Body() createMaterialDto: CreateMaterialDto) {
  //   return this.materialsService.create(createMaterialDto);
  // }

  @Get()
  @UseInterceptors(FindInterceptor)
  findAll(
    @Query('type') type: MaterialType,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('no') no: string,
    @Query('name') name: string,
    @Query('query') query: string,
    @Query('functionalities') func: string,
    @Query('consonant') consonant: string,
    @Query('searchType') searchType: string,
    @Query('sort') sort: string,
    @Query('mode') mode: string,
  ) {
    // if (name)
    //   return this.materialsService.findAllByName(type, page, limit, name);
    return this.materialsService.findAll(type, page, limit, {
      no,
      name,
      query,
      func,
      consonant,
      searchType,
      sort,
      mode,
    });
  }
  @Get('count')
  count(
    @Query('no') no: string,
    @Query('name') name: string,
    @Query('query') query: string,
    @Query('functionalities') func: string,
    @Query('consonant') consonant: string,
    @Query('searchType') searchType: string,
    @Query('mode') mode: string,
  ) {
    return this.materialsService.count({
      no,
      name,
      query,
      func,
      consonant,
      searchType,
      mode,
    });
  }
  @Get('eat-together/:ids')
  findEatTogether(@Param('ids') ids: string) {
    return this.materialsService.findManyEatTogether(ids);
  }

  @Get('brief/:ids')
  findNames(@Param('ids') ids: string) {
    return this.materialsService.findManyBrief(ids);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (Number.isNaN(Number(id[0]))) {
      return this.materialsService.findPreventOne(id);
    } else {
      return this.materialsService.findOne(id);
    }
  }
  // @Get(':name/prevent')
  // findPreventOne(@Param('name') name: string) {
  //   return this.materialsService.findPreventOne(name);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMaterialDto: UpdateMaterialDto,
  // ) {
  //   return this.materialsService.update(+id, updateMaterialDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.materialsService.remove(+id);
  // }
}
