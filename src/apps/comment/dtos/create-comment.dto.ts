import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  body: string;

  @IsString()
  article: string;

  @IsString()
  parent?: string;
}
