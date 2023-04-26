import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Db, GridFSBucketReadStream } from 'mongodb';
import { DbWrapper } from 'src/database/database.module';
import { koFuzzyLike, toUnique } from 'src/helper/utils';
import { emptyList, resItem, resList } from 'src/interceptors/find.interceptor';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(private db: DbWrapper) {}

  create(createFoodDto: CreateFoodDto) {
    return 'This action adds a new food';
  }

  async findAll(
    page = 1,
    limit = 10,
    {
      type,
      query,
      mats,
      func,
      consonant,
      searchType,
      materialText,
      sort,
      mode,
    }: Partial<{
      type: string;
      query: string;
      mats: string;
      func: string;
      consonant: string;
      searchType: string;
      materialText: string;
      sort: string;
      mode: string;
    }> = {},
  ) {
    if (limit > 100) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    let matsNo: string[] = [];

    const mtxt =
      materialText
        ?.split(',')
        .map((str) => str.trim())
        .filter((i) => i)
        .map((str) => str) ?? [];

    // if (materialText) {
    //   const mats = await this.db.FunctionalityMaterials.find({
    //     name: { $regex: mtxt.join('|') },
    //   })
    //     .map(({ no }) => no)
    //     .toArray();
    //   matsNo = toUnique(mats.flat());
    // }
    const cMats =
      mats
        ?.split(',')
        .map((str) => decodeURIComponent(str.trim()))
        .filter((i) => i) ?? [];
    // if (mats) {
    //   const cMats = mats.split(',').map(str => str.trim()).filter(i => i);
    //   console.log(cMats);
    //   const targetMats = await this.db.FunctionalityMaterials.find({
    //     materialNames: {$in: cMats}
    //   }).map(({no}) => no).toArray();
    //   matsNo = toUnique([...matsNo, ...targetMats.flat()]);
    // }

    const queryRegex = query ? query.replace(/ /g, '|') : '';
    const funcItems =
      func
        ?.split(',')
        .map((str) => str.trim())
        .filter((i) => i) ?? [];

    const targets = this.db.IntegrationFoodList.find({
      ...((type || mats || query || func || consonant || mtxt.length) && {
        $and: [
          type && { type: type as any },
          consonant?.length === 1 && {
            name: { $regex: '^' + koFuzzyLike(consonant) },
          },
          query && {
            $or:
              searchType === 'name'
                ? [{ name: { $regex: queryRegex, $options: 'i' } }]
                : searchType === 'company'
                ? [{ company: { $regex: queryRegex, $options: 'i' } }]
                : searchType === 'report_no'
                ? [{ report_no: { $regex: queryRegex, $options: 'i' } }]
                : searchType === 'content'
                ? [
                    // {text: {$regex: query, $options: 'i'}},
                  ]
                : [
                    { report_no: { $regex: queryRegex, $options: 'i' } },
                    { name: { $regex: queryRegex, $options: 'i' } },
                    { company: { $regex: queryRegex, $options: 'i' } },
                    // {text: {$regex: query, $options: 'i'}},
                  ],
          },
          func && {
            functionalities: {
              $all: funcItems,
              ...(mode === 'exactly' && { $size: funcItems.length }),
            },
          },
          cMats.length && {
            materialNames: {
              $all: cMats,
              ...(mode === 'exactly' && { $size: cMats.length }),
            },
          },
          mtxt.length && {
            materialNames: { $elemMatch: { $regex: mtxt.join('|') } },
          },
        ].filter((i) => i),
      }),
      hidden: false,
    })
      .project({
        type: 1,
        report_no: 1,
        name: 1,
        company: 1,
        materials: 1,
        functionalities: 1,
        warn: 1,
        thumbnail: 1,
        thumbnails: 1,
        views: 1,
      })
      .sort(
        sort === '' || sort === 'views'
          ? { views: -1, created_date: -1 }
          : sort === 'recently'
          ? { created_date: -1 }
          : sort === 'heart'
          ? { heart: -1, created_date: -1 }
          : { views: -1, created_date: -1 },
      );

    return resList(targets, { page, limit });
  }

  async findBrief(query: string, limit: string) {
    if (Number.isNaN(Number(limit)) || Number(limit) > 100)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const targets = this.db.IntegrationFoodList.find({
      $or: [
        { name: { $regex: '^' + koFuzzyLike(query), $options: 'i' } },
        { company: { $regex: koFuzzyLike(query), $options: 'i' } },
      ],
      hidden: false,
    });

    return resList(targets, { page: 1, limit: Number(limit) });
  }

  async findOne(idWithType: string) {
    const [type] = idWithType;
    const id = idWithType.slice(1);
    // const data = await this.db.IntegrationFoodList.findOne({ report_no: id });
    // if (!data)  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    // console.time('test');
    // let prev_no: string = '';
    // let next_no: string = '';
    // let end: boolean = false;
    // await this.db.IntegrationFoodList.find().sort({created_date: -1}).forEach(({report_no}: any) => {
    //   if (report_no === id) {
    //     end = true;
    //     return;
    //   } else {
    //     prev_no = report_no;
    //   }
    //   if (end) {
    //     next_no = report_no;
    //     return false;
    //   }
    // });
    // console.timeEnd('test');

    // console.log('prev_no', prev_no);
    // console.log('next_no', next_no);
    let iType: 'domestic' | 'foreign' = 'domestic';
    if (type === 'd') iType = 'domestic';
    else if (type === 'o') iType = 'foreign';

    const [data, detail, foreignFoodList, foreignFoodDetail] =
      await Promise.all([
        this.db.IntegrationFoodList.findOne({ type: iType, report_no: id }),
        iType === 'domestic' && this.db.I0030.findOne({ PRDLST_REPORT_NO: id }),
        iType === 'foreign' && this.db.ForeignFoodList.findOne({ rcno: id }),
        iType === 'foreign' && this.db.ForeignFoodDetail.findOne({ rcno: id }),
      ]);
    if (!data) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const { views, ...cdata } = data;
    return {
      data: cdata,
      domestic: detail || {},
      foreign: {
        list: foreignFoodList || {},
        detail: foreignFoodDetail || {
          foodDetailInfo: {},
        },
      },
    };
  }
  updateView(idWithType: string) {
    const [type] = idWithType;
    const id = idWithType.slice(1);
    let iType: 'domestic' | 'foreign' = 'domestic';
    if (type === 'd') iType = 'domestic';
    else if (type === 'o') iType = 'foreign';

    return this.db.IntegrationFoodList.updateOne(
      { report_no: id, type: iType },
      {
        $inc: { views: 1 },
      },
    );
  }
  updateHeart(idWithType: string) {
    const [type] = idWithType;
    const id = idWithType.slice(1);
    let iType: 'domestic' | 'foreign' = 'domestic';
    if (type === 'd') iType = 'domestic';
    else if (type === 'o') iType = 'foreign';

    return this.db.IntegrationFoodList.updateOne(
      { report_no: id, type: iType },
      {
        $inc: { heart: 1 },
      },
    );
  }
  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
