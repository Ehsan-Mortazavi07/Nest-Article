import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(@Req() req, createCommentDto: CreateCommentDto) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: parseInt(createCommentDto.article),
      },
    });

    if (!article) {
      throw new NotFoundException('چنین مقاله ای با این مشخصات وجود ندارد');
    }

    if (createCommentDto.parent) {
      const checkCommentParent = await this.prisma.comment.findUnique({
        where: {
          id: parseInt(createCommentDto.parent),
        },
      });
      if (!checkCommentParent) {
        throw new NotFoundException('چنین کامنتی ای با این مشخصات وجود ندارد');
      }
    }

    const newComment = await this.prisma.comment.create({
      data: {
        body: createCommentDto.body,
        articleId: article.id,
        userId: req.user.id,
        parentId: parseInt(createCommentDto.parent) || null,
      },
    });
    return { newComment };
  }
}
