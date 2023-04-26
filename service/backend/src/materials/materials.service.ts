import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FunctionalityMaterials } from 'hsin';
import { Db } from 'mongodb';
import { DbWrapper } from 'src/database/database.module';
import { koFuzzyLike, toUnique } from 'src/helper/utils';
import { resItem, resList } from 'src/interceptors/find.interceptor';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialType } from './dto/material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private db: DbWrapper) {}

  create(createMaterialDto: CreateMaterialDto) {
    return 'This action adds a new material';
  }

  async findAll(
    type: MaterialType,
    page = 1,
    limit = 10,
    {
      no,
      name,
      query,
      func,
      consonant,
      searchType,
      sort,
      mode,
    }: {
      no?: string;
      name?: string;
      query?: string;
      func?: string;
      consonant?: string;
      searchType?: string;
      sort?: string;
      mode?: string;
    } = {},
  ) {
    if (limit > 100) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // console.log(koFuzzyLike(name));
    // console.log('type', type);
    const queryRegex = query ? query.replace(/ /g, '|') : '';

    const funcItems =
      func
        ?.split(',')
        .map((str) => str.trim())
        .filter((i) => i) ?? [];
    const filterOptions = {
      ...((type || no || name || query || func || consonant || searchType) && {
        $and: [
          type && {
            type: {
              $in: type
                .split(',')
                .map((str) => str.trim())
                .filter((i) => i),
            },
          },
          no && {
            no: {
              $in: no
                .split(',')
                .map((str) => str.trim())
                .filter((i) => i),
            },
          },
          name && { name: { $regex: '^' + koFuzzyLike(name), $options: 'i' } },
          consonant?.length === 1 && {
            name: { $regex: '^' + koFuzzyLike(consonant) },
          },
          query && {
            $or:
              searchType === 'name'
                ? [{ name: { $regex: queryRegex, $options: 'i' } }]
                : searchType === 'company'
                ? [{ company: { $regex: queryRegex, $options: 'i' } }]
                : searchType === 'no'
                ? [{ no: { $regex: queryRegex, $options: 'i' } }]
                : [
                    { name: { $regex: queryRegex, $options: 'i' } },
                    { company: { $regex: queryRegex, $options: 'i' } },
                    { no: { $regex: queryRegex, $options: 'i' } },
                  ],
          },
          func && {
            functionality: {
              $all: funcItems,
              ...(mode === 'exactly' && { $size: funcItems.length }),
            },
          },
        ].filter((i) => i),
      }),
    };

    const targets = this.db.FunctionalityMaterials.find(filterOptions).sort(
      sort === '' || sort === 'recently'
        ? { created_date: -1 }
        : sort === 'views'
        ? { views: -1, created_date: -1 }
        : { created_date: -1 },
    );

    return resList(targets, { page, limit });
  }
  async count({
    no,
    name,
    query,
    func,
    consonant,
    searchType,
    mode,
  }: {
    no?: string;
    name?: string;
    query?: string;
    func?: string;
    consonant?: string;
    searchType?: string;
    mode?: string;
  } = {}) {
    const queryRegex = query ? query.replace(/ /g, '|') : '';

    const funcItems =
      func
        ?.split(',')
        .map((str) => str.trim())
        .filter((i) => i) ?? [];
    const filterOptions = {
      ...((no || name || query || func || consonant || searchType) && {
        $and: [
          no && {
            no: {
              $in: no
                .split(',')
                .map((str) => str.trim())
                .filter((i) => i),
            },
          },
          name && { name: { $regex: '^' + koFuzzyLike(name), $options: 'i' } },
          consonant?.length === 1 && {
            name: { $regex: '^' + koFuzzyLike(consonant) },
          },
          query && {
            $or:
              searchType === 'name'
                ? [{ name: { $regex: queryRegex, $options: 'i' } }]
                : searchType === 'company'
                ? [{ company: { $regex: queryRegex, $options: 'i' } }]
                : searchType === 'no'
                ? [{ no: { $regex: queryRegex, $options: 'i' } }]
                : [
                    { name: { $regex: queryRegex, $options: 'i' } },
                    { company: { $regex: queryRegex, $options: 'i' } },
                    { no: { $regex: queryRegex, $options: 'i' } },
                  ],
          },
          func && {
            functionality: {
              $all: funcItems,
              ...(mode === 'exactly' && { $size: funcItems.length }),
            },
          },
        ].filter((i) => i),
      }),
    };
    const [
      totalCount,
      nutrientCount,
      notificationCount,
      eachApprovalCount,
      forbidCount,
    ] = await Promise.all([
      this.db.FunctionalityMaterials.find(filterOptions).count(),
      this.db.FunctionalityMaterials.find({
        ...filterOptions,
        type: '고시형원료-영양소',
      }).count(),
      this.db.FunctionalityMaterials.find({
        ...filterOptions,
        type: '고시형원료-기능성원료',
      }).count(),
      this.db.FunctionalityMaterials.find({
        ...filterOptions,
        type: '개별인정원료',
      }).count(),
      this.db.FunctionalityMaterials.find({
        ...filterOptions,
        type: '사용불가원료',
      }).count(),
    ]);

    return {
      totalCount,
      nutrientCount,
      notificationCount,
      eachApprovalCount,
      forbidCount,
    };
  }
  async findManyBrief(ids: string) {
    if (ids.split(',').length > 100)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const idArr = ids.split(',').map((str) => str.trim());
    const targets = this.db.FunctionalityMaterials.find({
      no: { $in: [...new Set(idArr)] },
    });
    return (await targets.toArray()).map(
      ({
        _id,
        company,
        // functionality,
        amount,
        warn,
        abolished,
        canceled,
        eatTogether,
        description,
        requirements,
        ...data
      }: any) => {
        return data;
      },
    );
  }
  async findAllByName(type: MaterialType, page = 1, limit = 10, name: string) {
    if (limit > 100) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const targets = this.db.FunctionalityMaterials.find({
      ...(type && { type: { $in: type.split(',').map((str) => str.trim()) } }),
      name: { $regex: name },
    });

    return resList(targets, { page, limit });
  }

  async findAllByQuery(
    type: MaterialType,
    page = 1,
    limit = 10,
    query: string,
  ) {
    if (limit > 100) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const targets = this.db.FunctionalityMaterials.find({
      ...(type && { type }),
      $or: [
        { no: { $regex: query } },
        { name: { $regex: query } },
        { company: { $regex: query } },
        { functionality: { $regex: query } },
      ],
    });

    return resList(targets, { page, limit });
  }

  async findManyEatTogether(ids: string) {
    if (ids.split(',').length > 50)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const list = await this.db.FunctionalityMaterials.find({
      no: {
        $in: toUnique(
          ids
            .split(',')
            .map((str) => str.trim())
            .filter((i) => i),
        ),
      },
    })
      .map(({ eatTogether }) => eatTogether)
      .toArray();
    const flatList = list.flatMap((str) =>
      str
        .split(',')
        .map((str) => str.trim())
        .filter((i) => i),
    );
    return toUnique(flatList);
  }
  async updateView(item: FunctionalityMaterials) {
    if (!item) return;
    return this.db.FunctionalityMaterials.updateOne(
      { _id: (item as any)._id },
      {
        $inc: { views: 1 },
      },
    );
  }
  async findOne(id: string) {
    const result = await this.db.FunctionalityMaterials.findOne({
      no: { $in: [id] },
    });
    await this.updateView(result);
    return resItem(result);
  }
  async findPreventOne(name: string) {
    const result = await this.db.FunctionalityMaterials.findOne({
      type: '사용불가원료',
      name: name.replace(/_/g, ' '),
    });
    await this.updateView(result);
    return resItem(result);
  }
  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
