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
import { FunctionalitiesService } from './functionalities.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';
import { FunctionalityType } from './dto/functionality.dto';
import { FindInterceptor } from 'src/interceptors/find.interceptor';

@Controller('functionalities')
export class FunctionalitiesController {
  constructor(
    private readonly functionalitiesService: FunctionalitiesService,
  ) {}

  @Post()
  create(@Body() createFunctionalityDto: CreateFunctionalityDto) {
    return this.functionalitiesService.create(createFunctionalityDto);
  }

  @Get()
  @UseInterceptors(FindInterceptor)
  findAll(
    @Query('type') type: FunctionalityType,
    @Query('query') query: string,
    @Query('id') id: string,
    @Query('functionality') functionality: string,
  ) {
    if (query) return this.functionalitiesService.findAllByQuery({type, query});
    return this.functionalitiesService.findAll({type, id, functionality});
  }
  @Get('/brief/:ids')
  findBrief(@Param('ids') ids: string) {
    return this.functionalitiesService.findManyBrief(ids);
  }
  @Get(':id')
  @UseInterceptors(FindInterceptor)
  findOne(@Param('id') id: string) {
    return this.functionalitiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFunctionalityDto: UpdateFunctionalityDto,
  ) {
    return this.functionalitiesService.update(+id, updateFunctionalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionalitiesService.remove(+id);
  }
}
