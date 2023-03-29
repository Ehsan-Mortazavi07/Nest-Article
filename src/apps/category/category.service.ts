import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(public prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const checkCategory = await this.prisma.category.findUnique({
      where: {
        slug: createCategoryDto.slug,
      },
    });
    if (checkCategory) {
      throw new BadRequestException('چنین مقاله ای با این مشخصات وچود دارد');
    }

    if (createCategoryDto.parent) {
      const checkCategoryParent = await this.prisma.category.findUnique({
        where: {
          id: parseInt(createCategoryDto.parent),
        },
      });
      if (!checkCategoryParent) {
        throw new NotFoundException('چنین مقاله ای با این مشخصات وجود ندارد');
      }
    }

    const newCategory = await this.prisma.category.create({
      data: {
        title: createCategoryDto.title,
        slug: createCategoryDto.slug,
        parentId: parseInt(createCategoryDto.parent) || null,
      },
    });
    return newCategory;
  }
}
