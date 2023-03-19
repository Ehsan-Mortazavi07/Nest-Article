import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(public prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto, @Req() req) {}


}
