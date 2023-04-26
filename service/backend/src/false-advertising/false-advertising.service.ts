import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DbWrapper } from 'src/database/database.module';
import { resItem, resList } from 'src/interceptors/find.interceptor';
import { CreateFalseAdvertisingDto } from './dto/create-false-advertising.dto';
import { UpdateFalseAdvertisingDto } from './dto/update-false-advertising.dto';

@Injectable()
export class FalseAdvertisingService {
  constructor(private db: DbWrapper) {}

  create(createFalseAdvertisingDto: CreateFalseAdvertisingDto) {
    return 'This action adds a new falseAdvertising';
  }

  findAll() {
    const target = this.db.FalseAdvertising.find({});

    return resList(target, {
      page: 1,
      limit: 100,
      id: true,
    });
  }

  findOne(id: string) {
    const target = this.db.FalseAdvertising.findOne(new ObjectId(id));
    
    return resItem(target);
  }

  update(id: number, updateFalseAdvertisingDto: UpdateFalseAdvertisingDto) {
    return `This action updates a #${id} falseAdvertising`;
  }

  remove(id: number) {
    return `This action removes a #${id} falseAdvertising`;
  }
}
