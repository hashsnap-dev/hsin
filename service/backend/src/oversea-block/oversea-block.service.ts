import { Injectable } from '@nestjs/common';
import { DbWrapper } from 'src/database/database.module';
import { resList } from 'src/interceptors/find.interceptor';
import { CreateOverseaBlockDto } from './dto/create-oversea-block.dto';
import { UpdateOverseaBlockDto } from './dto/update-oversea-block.dto';

@Injectable()
export class OverseaBlockService {
  constructor(private db: DbWrapper) {}

  create(createOverseaBlockDto: CreateOverseaBlockDto) {
    return 'This action adds a new overseaBlock';
  }

  async findAll(page: string, limit: string, {query, searchType}: {query?: string; searchType?: string} = {}) {
    const target = this.db.ForeignBlockFood.find({
      ...query && {
        $or: searchType === 'name' ? [
          {cntntsSj: {$regex: query, $options: 'i'}},
        ] : searchType === 'company' ? [
          {iemCtntNm2: {$regex: query, $options: 'i'}},
        ] : searchType === 'country' ? [
          {iemCtntNm1: {$regex: query, $options: 'i'}},
        ] : [
          {cntntsSj: {$regex: query, $options: 'i'}},
          {iemCtntNm2: {$regex: query, $options: 'i'}},
          {iemCtntNm1: {$regex: query, $options: 'i'}},
        ],
      },
    });
    const pageNumber = Number(page ?? 1);
    const limitNumber = 10;

    return resList(target, {
      page: pageNumber,
      limit: limitNumber,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} overseaBlock`;
  }

  update(id: number, updateOverseaBlockDto: UpdateOverseaBlockDto) {
    return `This action updates a #${id} overseaBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} overseaBlock`;
  }
}
