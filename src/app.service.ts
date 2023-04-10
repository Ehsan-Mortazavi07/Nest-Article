import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async showArticles() {
    const articles = await this.prisma.article.findMany({
      orderBy: [
        {
          published: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
      take: 5,
    });
    return { articles };
  }
}
