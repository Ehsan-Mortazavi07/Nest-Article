import { IsNumber, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  article: string;
}
