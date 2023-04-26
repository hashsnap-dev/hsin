import { Injectable } from '@nestjs/common';
import { DbWrapper } from 'src/database/database.module';
import { UpdateFoodUrlDto } from './dto/update-food-url.dto';

@Injectable()
export class FoodUrlService {
  constructor(private db: DbWrapper) {}

  findOne(id: string) {
    return this.db.IntegrationFoodThumbnailList.findOne({ report_no: id });
  }

  update(id: string, updateFoodUrlDto: UpdateFoodUrlDto) {
    return this.db.IntegrationFoodThumbnailList.updateOne(
      { report_no: id },
      {
        $set: {
          ...updateFoodUrlDto,
          updated_at: new Date(),
        },
      },
    );
  }

  remove(id: string) {
    return this.db.IntegrationFoodThumbnailList.updateOne(
      { report_no: id },
      { $set: { url: '', updated_at: new Date() } },
    );
  }
}
