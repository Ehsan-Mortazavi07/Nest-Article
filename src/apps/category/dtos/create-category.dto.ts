import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  parent?: string;
}
