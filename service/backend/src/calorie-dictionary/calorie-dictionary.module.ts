import { Module } from '@nestjs/common';
import { CalorieDictionaryService } from './calorie-dictionary.service';
import { CalorieDictionaryController } from './calorie-dictionary.controller';

@Module({
  controllers: [CalorieDictionaryController],
  providers: [CalorieDictionaryService]
})
export class CalorieDictionaryModule {}
