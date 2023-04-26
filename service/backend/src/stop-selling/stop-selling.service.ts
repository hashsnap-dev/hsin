import { Injectable } from '@nestjs/common';
import { DbWrapper } from 'src/database/database.module';
import { resItem, resList } from 'src/interceptors/find.interceptor';
import { CreateStopSellingDto } from './dto/create-stop-selling.dto';
import { UpdateStopSellingDto } from './dto/update-stop-selling.dto';

@Injectable()
export class StopSellingService {
  constructor(private db: DbWrapper) {}
  create(createStopSellingDto: CreateStopSellingDto) {
    return 'This action adds a new stopSelling';
  }

  findAll(page: string, limit: string, {query, searchType}: {query?: string; searchType?: string} = {}) {
    const target = this.db.StopSelling.find({
      ...query && {
        $or: searchType === 'name' ? [
          {name: {$regex: query, $options: 'i'}},
        ] : searchType === 'company' ? [
          {company: {$regex: query, $options: 'i'}},
        ] : [
          {name: {$regex: query, $options: 'i'}},
          {company: {$regex: query, $options: 'i'}},
        ],
      },
    });
    const pageNumber = Number(page ?? 1);
    const limitNumber = 12;

    return resList(target, {
      page: pageNumber,
      limit: limitNumber,
    });
  }

  findOne(id: string) {
    const target = this.db.StopSelling.findOne({id: Number(id)});
    return resItem(target);
  }

  update(id: number, updateStopSellingDto: UpdateStopSellingDto) {
    return `This action updates a #${id} stopSelling`;
  }

  remove(id: number) {
    return `This action removes a #${id} stopSelling`;
  }
}
