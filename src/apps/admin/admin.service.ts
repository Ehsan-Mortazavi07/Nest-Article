import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(public prisma: PrismaService) {}

  async deleteCategory(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('چنین کتگوری ای وجود ندارد');
    }
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async deleteCategories() {
    const categories = await this.prisma.user.findMany({});

    if (!categories) {
      throw new NotFoundException('هیچ کتگوری ای وجود ندارد');
    }

    await this.prisma.category.deleteMany({});
  }

  async deleteArticle(id: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (!article) {
      throw new NotFoundException('چنین مقاله ای وجود ندارد');
    }
    await this.prisma.article.delete({
      where: {
        id,
      },
    });
  }

  async deleteArticles() {
    const articles = await this.prisma.article.findMany({});

    if (!articles) {
      throw new NotFoundException('هیچ مقاله ای وجود ندارد');
    }

    await this.prisma.article.deleteMany({});
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('چنین کاربری وجود ندارد');
    }
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async deleteUsers() {
    const users = await this.prisma.user.findMany({});

    if (!users) {
      throw new NotFoundException('هیچ کاربری وجود ندارد');
    }

    await this.prisma.user.deleteMany({});
  }

  async publishArticle(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });
    if (!article) {
      throw new NotFoundException('چنین مقاله ای وجود ندارد');
    }
    await this.prisma.article.update({
      where: {
        slug,
      },
      data: {
        published: true,
      },
    });
  }

  async publishArticles() {
    const article = await this.prisma.article.findMany({});
    if (!article) {
      throw new NotFoundException('هیچ مقاله ای وجود ندارد');
    }
    await this.prisma.article.updateMany({
      data: {
        published: true,
      },
    });
  }

  async unpublishArticle(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });
    if (!article) {
      throw new NotFoundException('چنین مقاله ای وجود ندارد');
    }
    await this.prisma.article.update({
      where: {
        slug,
      },
      data: {
        published: false,
      },
    });
  }

  async unpublishArticles() {
    const article = await this.prisma.article.findMany({});
    if (!article) {
      throw new NotFoundException('هیچ مقاله ای وجود ندارد');
    }
    await this.prisma.article.updateMany({
      data: {
        published: false,
      },
    });
  }
}
