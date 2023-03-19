import { Injectable, Req, Request } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { PrismaService } from 'prisma/prisma.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { EditArticleDto } from './dtos/edit-article.dto';

@Injectable()
export class ArticleService {
  constructor(public prisma: PrismaService) {}

  async createArticle(createArticleDto: CreateArticleDto, @Req() req) {
    const checkArticle = await this.prisma.article.findUnique({
      where: {
        slug: createArticleDto.slug,
      },
    });
    if (checkArticle) {
      throw new BadRequestException(
        'چنین مقاله ای با این مشخصات از قبل وجود دارد',
      );
    }

    const category = await this.prisma.category.findUnique({
      where: {
        title: createArticleDto.category,
      },
    });

    if (!category) {
      throw new NotFoundException('چنین کتگوری با این مشخصات وجود ندارد');
    }

    const newArticle = await this.prisma.article.create({
      data: {
        authorId: req.user.id,
        title: createArticleDto.title,
        description: createArticleDto.description,
        video: createArticleDto.video,
        picture: createArticleDto.picture,
        slug: createArticleDto.slug,
        categoryId: category.id,
      },
    });
    return newArticle;
  }

  async showAll() {
    const articles = await this.prisma.article.findMany();
    if (!articles) {
      throw new NotFoundException('هیچ مقاله ای وجود ندارد');
    }
    return articles;
  }

  async showOne(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });
    if (!article) {
      throw new NotFoundException('چنین مقاله ای وجود ندارد');
    }
    return article;
  }

  async editArticle(
    @Request() req,
    editArticleDto: EditArticleDto,
    id: number,
  ) {
    let article = await this.prisma.article.findUnique({
      where: {
        id: id,
      },
    });

    if (!article) {
      throw new NotFoundException('چنین مقاله ای وجود ندارد');
    } else if (article.authorId !== req.user.id || req.user.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    console.log(article.authorId);
    const checkSlugArticle = await this.prisma.article.findUnique({
      where: {
        slug: editArticleDto.slug,
      },
    });

    if (checkSlugArticle && checkSlugArticle.id !== article.id) {
      throw new BadRequestException(
        'چنین مقاله ای با این اسلاگ از قبل وجود دارد',
      );
    }

    await this.prisma.article.update({
      where: {
        id: id,
      },
      data: {
        title: editArticleDto.title,
        description: editArticleDto.description,
        video: editArticleDto.video,
        picture: editArticleDto.picture,
        slug: editArticleDto.slug,
      },
    });

    article = await this.prisma.article.findUnique({
      where: {
        id: id,
      },
    });

    return article;
  }
}
