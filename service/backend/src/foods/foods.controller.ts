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
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { GetFoodsDto } from './dto/get-foods.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  // @Post()
  // create(@Body() createFoodDto: CreateFoodDto) {
  //   return this.foodsService.create(createFoodDto);
  // }

  @Get()
  @UseInterceptors(FindInterceptor)
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('query') query: string,
    @Query('type') type: string,
    @Query('materials') mats: string,
    @Query('functionalities') func: string,
    @Query('consonant') consonant: string,
    @Query('searchType') searchType: string,
    @Query('materialText') materialText: string,
    @Query('sort') sort: string,
    @Query('mode') mode: string,
  ) {
    return this.foodsService.findAll(page, limit, {
      query,
      type,
      mats,
      func,
      consonant,
      searchType,
      materialText,
      sort,
      mode,
    });
  }

  @Get('brief')
  @UseInterceptors(FindInterceptor)
  findBrief(@Query('query') query: string, @Query('limit') limit: string) {
    return this.foodsService.findBrief(query, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.foodsService.updateView(id);
    return this.foodsService.findOne(id);
  }
  @Post(':id')
  async updateHeart(@Param('id') id: string) {
    await this.foodsService.updateHeart(id);

    return null;
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
  //   return this.foodsService.update(+id, updateFoodDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.foodsService.remove(+id);
  // }
}
