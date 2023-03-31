import { IsNumber, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  article: number;
}
