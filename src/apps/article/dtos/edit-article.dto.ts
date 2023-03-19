import { IsString } from 'class-validator';

export class EditArticleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  picture?: string;

  @IsString()
  video?: string;

  @IsString()
  category: string;

  @IsString()
  slug: string;
}