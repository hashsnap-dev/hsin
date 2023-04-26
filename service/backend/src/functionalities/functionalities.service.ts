import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { Db, FindCursor } from 'mongodb';
import { DbWrapper } from 'src/database/database.module';
import { koFuzzyLike } from 'src/helper/utils';
import { resItem, resList } from 'src/interceptors/find.interceptor';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { FunctionalityType } from './dto/functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';

@Injectable()
export class FunctionalitiesService {
  constructor(private db: DbWrapper) {}

  create(createFunctionalityDto: CreateFunctionalityDto) {
    return 'This action adds a new functionality';
  }

  async findAll({type, id, functionality}: {type?: FunctionalityType; id?: string; functionality?: string;} = {}) {
    const targets = this.db.Functionalities.find({
      ...(type && { type }),
      ...id && {id: {$in: id.split(',').map(str => str.trim()).filter(i => i)}},
      ...functionality && {functionality: {$regex: '^' + koFuzzyLike(functionality), $options: 'i'}},
    }).sort(functionality ? {functionality: 1} : {});
    return resList(targets, { everything: true });
  }

  async findAllByQuery({type, query}: {type?: FunctionalityType; query?: string;} = {}) {
    const targets = this.db.Functionalities.find({
      ...(type && { type }),
      $or: [{ id: { $regex: query } }, { functionality: { $regex: query } }],
    });

    return resList(targets, { everything: true });
  }
  async findManyBrief(ids: string) {
    if (ids.split(',').length > 100) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const idArr = ids.split(',').map(str => str.trim());
    const targets = this.db.Functionalities.find({
      id: {$in: [...new Set(idArr)]},
      // type: {
      //   $in: [
      //     '생리활성기능',
      //     '질병발생위험감소기능',
      //   ],
      // }
    });
    return (await targets.toArray()).map(({_id, content, ...data}: any) => {
      return data;
    });
  }
  async findOne(id: string) {
    const result = this.db.Functionalities.findOne({ id });
    return resItem(result);
  }

  update(id: number, updateFunctionalityDto: UpdateFunctionalityDto) {
    return `This action updates a #${id} functionality`;
  }

  remove(id: number) {
    return `This action removes a #${id} functionality`;
  }
}
