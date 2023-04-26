import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

import {IntegrationFoodList} from 'hsin';
const a: IntegrationFoodList = {} as any;
console.log(a);