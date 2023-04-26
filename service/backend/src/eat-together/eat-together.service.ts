import { Injectable } from '@nestjs/common';
import { DbWrapper } from 'src/database/database.module';
import { toUnique } from 'src/helper/utils';
import { emptyList, resList } from 'src/interceptors/find.interceptor';
import { CreateEatTogetherDto } from './dto/create-eat-together.dto';
import { UpdateEatTogetherDto } from './dto/update-eat-together.dto';

@Injectable()
export class EatTogetherService {
  constructor(private db: DbWrapper) {}

  create(createEatTogetherDto: CreateEatTogetherDto) {
    return 'This action adds a new eatTogether';
  }
  async findAll(page?: string, limit?: string, {query}: {query?: string} = {}) {
    const targets = this.db.EatTogether.find({
      ...query && {
        $or: [
          {query: {$regex: query, $options: 'i'}},
        ]
      }
    });
    const pageNumber = Number(page ?? 1);
    const limitNumber = Number(limit ?? 20);
    return resList(targets, { page: pageNumber, limit: limitNumber, id: true });
  }
  // FIXME: 이름만 나오게하고 의약품 이름으로 상세내용 검색하는 기능 추가 필요
  async findByFoodNo(foodNo: string) {
    const targetFood = await this.db.IntegrationFoodList.findOne({
      report_no: foodNo,
    });
    if (!targetFood) return emptyList;
    // console.log(targetFood);
    const eatTogetherNamesRaw = await this.db.FunctionalityMaterials.find({
      no: { $in: targetFood.materials },
    })
      .map(({ eatTogether }) => eatTogether)
      .toArray();
    const eatTogetherNames = toUnique(eatTogetherNamesRaw.filter((i) => i));
    return eatTogetherNames;
  }

  async findByNames(names: string) {
    const targets = this.db.EatTogether.find({
      name: { $in: names.split(',').map((str) => str.trim()) },
    });
    return resList(targets, { page: 1, limit: 100, id: true });
  }

  findOne(id: number) {
    return `This action returns a #${id} eatTogether`;
  }

  update(id: number, updateEatTogetherDto: UpdateEatTogetherDto) {
    return `This action updates a #${id} eatTogether`;
  }

  remove(id: number) {
    return `This action removes a #${id} eatTogether`;
  }
}
