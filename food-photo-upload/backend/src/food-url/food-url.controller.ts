import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FoodUrlService } from './food-url.service';
import { UpdateFoodUrlDto } from './dto/update-food-url.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('food-url')
export class FoodUrlController {
  constructor(private readonly foodUrlService: FoodUrlService) {}

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  findOne(@Param('id') id: string) {
    return this.foodUrlService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthenticatedGuard)
  async update(
    @Param('id') id: string,
    @Body() updateFoodUrlDto: UpdateFoodUrlDto,
  ) {
    await this.foodUrlService.update(id, updateFoodUrlDto);

    return this.foodUrlService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('id') id: string, @Request() req) {
    if (!req.user.deletable) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.foodUrlService.remove(id);
  }
}
