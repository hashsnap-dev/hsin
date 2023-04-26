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
import { EatTogetherService } from './eat-together.service';
import { CreateEatTogetherDto } from './dto/create-eat-together.dto';
import { UpdateEatTogetherDto } from './dto/update-eat-together.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('eat-together')
@UseInterceptors(FindInterceptor)
export class EatTogetherController {
  constructor(private readonly eatTogetherService: EatTogetherService) {}

  @Post()
  create(@Body() createEatTogetherDto: CreateEatTogetherDto) {
    return this.eatTogetherService.create(createEatTogetherDto);
  }

  @Get()
  findAll(
    @Query('food') food: string,
    @Query('names') names: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('query') query: string,
  ) {
    if (food) return this.eatTogetherService.findByFoodNo(food);
    else if (names)
      return this.eatTogetherService.findByNames(names);
    else return this.eatTogetherService.findAll(page, limit || '20', {query});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eatTogetherService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEatTogetherDto: UpdateEatTogetherDto,
  ) {
    return this.eatTogetherService.update(+id, updateEatTogetherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eatTogetherService.remove(+id);
  }
}
