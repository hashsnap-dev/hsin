import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FindCursor } from 'mongodb';
import { map, Observable } from 'rxjs';

export const resItem = <T>(item: T) => ({ type: 'item', data: item });
export const resList = <T>(
  list: FindCursor<T>,
  {
    everything,
    page,
    limit,
    id = false,
    transformer,
  }: {
    everything?: boolean;
    page?: number;
    limit?: number;
    id?: boolean;
    transformer?: <T extends any[]>(data: T) => any;
  } = {} as any,
) => ({
  type: 'list',
  page: everything ? 1 : page,
  limit: everything ? Infinity : limit,
  id,
  transformer,
  findCursor: list,
});
export const emptyList = {
  type: 'list',
  total: 0,
  data: [],
};

export type FindResult<T> =
  | {
      type: 'item';
      data: Promise<T> | T;
    }
  | {
      type: 'list';
      page?: number;
      limit?: number;
      id?: boolean;
      transformer?: <T, K>(data: T) => K;
      findCursor: FindCursor<T>;
    };

@Injectable()
export class FindInterceptor<T> implements NestInterceptor<any, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (returnedValue: FindResult<any>) => {
        if (returnedValue === emptyList) {
          return emptyList;
        } else if (Array.isArray(returnedValue)) {
          return {
            type: 'list',
            data: returnedValue,
          };
        }

        if (returnedValue.type === 'item') {
          const { type, data } = returnedValue;
          const result = await data;
          if (!result)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
          const { _id, views, ...cData } = result;
          return {
            type,
            data: cData,
          };
        } else if (returnedValue.type === 'list') {
          const { type, limit, page, findCursor, transformer, id } = returnedValue;
          const cLimit = limit ?? 10;
          const cPage = ((page ?? 1) - 1) * cLimit;
          const [total, data] = await Promise.all([
            findCursor.count(),
            findCursor
              .skip(cPage)
              .limit(cLimit)
              .toArray()
              .then((arr) => arr.map(({ _id, ...data }) => id ? {...data, _id} : data)),
          ]);

          return Promise.resolve(transformer ? transformer(data) : data)
            .then((findResult: any[] | FindCursor<any>) =>
              findResult instanceof FindCursor
                ? findResult.toArray()
                : findResult,
            )
            .then((data) => {
              return {
                type,
                total,
                data: data.map(({ _id, total_count, ...data }) => id ? {...data, _id} : data),
              };
            });
        } else {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
          return {} as any;
        }
      }),
    );
  }
}
