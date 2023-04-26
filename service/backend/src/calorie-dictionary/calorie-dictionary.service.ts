import { Injectable } from '@nestjs/common';
import { DbWrapper } from 'src/database/database.module';
import { resList } from 'src/interceptors/find.interceptor';
import { CreateCalorieDictionaryDto } from './dto/create-calorie-dictionary.dto';
import { UpdateCalorieDictionaryDto } from './dto/update-calorie-dictionary.dto';

@Injectable()
export class CalorieDictionaryService {
  constructor(private db: DbWrapper) {}

  create(createCalorieDictionaryDto: CreateCalorieDictionaryDto) {
    return 'This action adds a new calorieDictionary';
  }

  findAll({
    page,
    query,
  }: { page?: number; limit?: number; query?: string } = {}) {
    const flimit = 10;
    const targets = this.db.I2790.find({
      ...(query && {
        DESC_KOR: { $regex: query, $options: 'i' },
      }),
    });

    return resList(targets, { page, limit: flimit });
  }

  findOne(id: number) {
    return `This action returns a #${id} calorieDictionary`;
  }
  count({
    page,
    query,
  }: { page?: number; limit?: number; query?: string } = {}) {
    const flimit = 10;
    const targets = this.db.I2790.find({
      ...(query && {
        DESC_KOR: { $regex: query, $options: 'i' },
      }),
    });

    return targets.count();
  }

  update(id: number, updateCalorieDictionaryDto: UpdateCalorieDictionaryDto) {
    return `This action updates a #${id} calorieDictionary`;
  }

  remove(id: number) {
    return `This action removes a #${id} calorieDictionary`;
  }
}
