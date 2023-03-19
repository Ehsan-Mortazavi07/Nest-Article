import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
  imports: [PrismaModule],
})
export class ArticleModule {}
