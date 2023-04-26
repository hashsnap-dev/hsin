import { Global, Module } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';
import {
  DomesticFoodList,
  DomesticFoodDetail,
  I0030,
  C003,
  FoodRawMaterials,
  FunctionalityMaterials,
  CrawlMaterials,
  ForeignFoodList,
  MapFoodMatNameToFunctionalityMatName,
  ForeignFoodDetail,
  MapFoodMatsToMats,
  Functionalities,
  I0040,
  ProcessedMaterials,
  IntegrationFoodList,
  EatTogether,
  FalseAdvertising,
  StopSelling,
  ForeignBlockFoodList,
  I2790,
  I2715,
} from 'hsin';

// // @Injectable()
export class DbWrapper {
  constructor(private db: Db) {}

  get DomesticFoodList(): Collection<DomesticFoodList> {
    return this.db.collection('_domestic-food-list');
  }
  get DomesticFoodDetail(): Collection<DomesticFoodDetail> {
    return this.db.collection('_domestic-food-detail');
  }
  get I0030(): Collection<I0030> {
    return this.db.collection('I0030');
  }
  get C003(): Collection<C003> {
    return this.db.collection('C003');
  }
  get IntegrationFoodList(): Collection<IntegrationFoodList> {
    return this.db.collection('_integration-food-list');
  }
  get DomesticFoodMaterials(): Collection<FoodRawMaterials> {
    return this.db.collection('_domestic-food-materials');
  }
  get FunctionalityMaterials(): Collection<FunctionalityMaterials> {
    return this.db.collection('_functionality-materials');
  }
  get CrawlMaterials(): Collection<CrawlMaterials> {
    return this.db.collection('_crawl-materials');
  }
  get ForeignFoodList(): Collection<ForeignFoodList> {
    return this.db.collection('_foreign-food-list');
  }
  get MapFoodMatNameToFunctionalityMatName(): Collection<MapFoodMatNameToFunctionalityMatName> {
    return this.db.collection('_map-foodMats-to-mats');
  }
  get ForeignFoodDetail(): Collection<ForeignFoodDetail> {
    return this.db.collection('_foreign-food-detail');
  }
  get MapFoodMatsToMats(): Collection<MapFoodMatsToMats> {
    return this.db.collection('_map-foodMats-to-mats');
  }
  get Functionalities(): Collection<Functionalities> {
    return this.db.collection('_functionalities');
  }
  get ProcessedMaterials(): Collection<ProcessedMaterials> {
    return this.db.collection('_processed-materials');
  }
  get I0040(): Collection<I0040> {
    return this.db.collection('I0040');
  }
  get I2790(): Collection<I2790> {
    return this.db.collection('I2790');
  }
  get I2715(): Collection<I2715> {
    return this.db.collection('I2715');
  }
  get FalseAdvertising(): Collection<FalseAdvertising> {
    return this.db.collection('_false_advertising');
  }
  get EatTogether(): Collection<EatTogether> {
    return this.db.collection('_eat_together');
  }
  get StopSelling(): Collection<StopSelling> {
    return this.db.collection('_stop-selling');
  }
  get ForeignBlockFood(): Collection<ForeignBlockFoodList> {
    return this.db.collection('_foreign-block-food-list');
  }
}

@Global()
@Module({
  providers: [
    {
      provide: DbWrapper,
      async useFactory(): Promise<DbWrapper> {
        try {
          const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
          return new DbWrapper(client.db('hsin'));
        } catch (e) {
          throw new Error(e);
        }
      },
    },
  ],
  exports: [DbWrapper],
})
export class DatabaseModule {}
