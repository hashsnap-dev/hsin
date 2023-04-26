import { Global, Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

const REFRESH_FOOD_DATA = false;

export interface IntegrationFoodThumbnailList {
  type: 'domestic' | 'foreign';
  report_no: string;
  name: string;
  company: string;
  thumbnails: string[];
  url: string;
}

export interface IntegrationFoodList {
  type: 'domestic' | 'foreign';
  report_no: string;
  name: string;
  company: string;
  materials: string[];
  functionaliites: string[];
  warn: string[];
  thumbnail: string;
  url: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  salt: string;
  role: string;
  phone: string;
  name: string;
  deletable: boolean;
}

export class DbWrapper {
  constructor(private db: Db) {}
  get IntegrationFoodThumbnailList() {
    return this.db.collection<IntegrationFoodThumbnailList>(
      'IntegrationFoodThumbnailList',
    );
  }
  get User() {
    return this.db.collection<User>('_user');
  }
}

@Global()
@Module({
  providers: [
    {
      provide: DbWrapper,
      async useFactory(): Promise<DbWrapper> {
        try {
          const client = await MongoClient.connect(process.env.MONGODB_URL);
          const dbHsin = client.db('hsin');
          const dbWrapper = new DbWrapper(client.db('hsin-food-photo'));
          await dbWrapper.IntegrationFoodThumbnailList.createIndex(
            { report_no: 1 },
            { unique: false },
          );

          await dbWrapper.User.createIndex({ username: 1 }, { unique: true });

          if (REFRESH_FOOD_DATA) {
            const foodList = await dbHsin
              .collection<IntegrationFoodList>('_integration-food-list')
              .find({})
              .toArray();

            await dbWrapper.IntegrationFoodThumbnailList.insertMany(
              foodList.map(({ name, company, report_no, type }) => ({
                name,
                company,
                report_no,
                type,
                thumbnails: [],
                url: '',
              })),
              { ordered: false },
            );
          }

          return dbWrapper;
        } catch (e) {
          console.error(e);
        }
      },
    },
  ],
  exports: [DbWrapper],
})
export class DatabaseModule {}
