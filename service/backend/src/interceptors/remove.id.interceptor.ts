import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

type Type<T> = {
  total?: number;
  data: (T & { _id })[];
};

export type ResType<T> = {
  total?: number;
  data: T[];
};

@Injectable()
export class RemoveIdInterceptor<T>
  implements NestInterceptor<Type<T>, ResType<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResType<T>> {
    return next.handle().pipe(
      map(({ total, data }) => {
        if (total) {
          return {
            total,
            data: data.map(({ _id, ...data }) => data),
          };
        } else {
          const { _id, ...cData } = data;
          return {
            data: cData,
          };
        }
      }),
    );
  }
}
