import { IsUrl } from 'class-validator';

export class CreateFoodUrlDto {
  @IsUrl()
  url: string;
}
