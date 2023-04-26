import { Injectable } from '@nestjs/common';
import { DbWrapper } from 'src/database/database.module';
import { resList } from 'src/interceptors/find.interceptor';
import { CreateForeignBlockDto } from './dto/create-foreign-block.dto';
import { UpdateForeignBlockDto } from './dto/update-foreign-block.dto';

@Injectable()
export class ForeignBlockService {
  constructor(private db: DbWrapper) {}
  create(createForeignBlockDto: CreateForeignBlockDto) {
    return 'This action adds a new foreignBlock';
  }

  findAll(
    page: string,
    limit: string,
    { query, searchType }: { query?: string; searchType?: string } = {},
  ) {
    const target = this.db.I2715.find({
      ...(query && {
        $or:
          searchType === 'name'
            ? [{ PRDT_NM: { $regex: query, $options: 'i' } }]
            : searchType === 'company'
            ? [{ MUFC_NM: { $regex: query, $options: 'i' } }]
            : [
                { PRDT_NM: { $regex: query, $options: 'i' } },
                { MUFC_NM: { $regex: query, $options: 'i' } },
              ],
      }),
      hidden: false,
    }).sort({ SELF_IMPORT_SEQ: -1 });
    const pageNumber = Number(page ?? 1);
    const limitNumber = 12;

    return resList(target, {
      page: pageNumber,
      limit: limitNumber,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} foreignBlock`;
  }

  update(id: number, updateForeignBlockDto: UpdateForeignBlockDto) {
    return `This action updates a #${id} foreignBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} foreignBlock`;
  }
}
