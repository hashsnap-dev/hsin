import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';
import { MaterialsModule } from './materials/materials.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { DatabaseModule } from './database/database.module';
import { FalseAdvertisingModule } from './false-advertising/false-advertising.module';
import { EatTogetherModule } from './eat-together/eat-together.module';
import { StopSellingModule } from './stop-selling/stop-selling.module';
import { OverseaBlockModule } from './oversea-block/oversea-block.module';
import { CalorieDictionaryModule } from './calorie-dictionary/calorie-dictionary.module';
import { ForeignBlockModule } from './foreign-block/foreign-block.module';

@Module({
  imports: [
    FoodsModule,
    MaterialsModule,
    FunctionalitiesModule,
    DatabaseModule,
    FalseAdvertisingModule,
    EatTogetherModule,
    StopSellingModule,
    OverseaBlockModule,
    CalorieDictionaryModule,
    ForeignBlockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
