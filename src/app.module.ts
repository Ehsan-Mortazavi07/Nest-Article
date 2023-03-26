import { Module } from '@nestjs/common';
import { UserModule } from './apps/user/user.module';
import { AuthModule } from './apps/auth/auth.module';
import { ArticleModule } from './apps/article/article.module';
import { AdminModule } from './apps/admin/admin.module';
import { CategoryModule } from './apps/category/category.module';

@Module({
  imports: [UserModule, AuthModule, ArticleModule, AdminModule,CategoryModule],
})
export class AppModule {}
