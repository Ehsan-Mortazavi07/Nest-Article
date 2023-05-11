import { Module } from '@nestjs/common';
import { UserModule } from './apps/user/user.module';
import { AuthModule } from './apps/auth/auth.module';
import { ArticleModule } from './apps/article/article.module';
import { AdminModule } from './apps/admin/admin.module';
import { CategoryModule } from './apps/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LikeModule } from './apps/like/like.module';
import { CommentModule } from './apps/comment/comment.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    AdminModule,
    CategoryModule,
    LikeModule,
    CommentModule,
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
