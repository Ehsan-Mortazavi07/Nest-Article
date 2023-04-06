import {
  Body,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLikeDto } from './dtos/create-like.dto';

@Injectable()

export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async isLike(@Req() req, @Body() createLikeDto: CreateLikeDto) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: parseInt(createLikeDto.article),
      },
    });

    if (!article) {
      throw new NotFoundException('چنین مقاله ای با این مشخصات وجود ندارد');
    }

    const like = await this.prisma.like.findFirst({
      where: {
        articleId: article.id,
        userId: req.user.id,
      },
    });

    if (like) {
      await this.prisma.like.delete({
        where: {
          id: like.id,
        },
      });
    } else {
      await this.prisma.like.create({
        data: {
          userId: req.user.id,
          articleId:article.id,
        },
      });
    }
  }
}
