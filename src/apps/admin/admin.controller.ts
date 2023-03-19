import { Controller, Delete, Param, UseGuards, Post } from '@nestjs/common';
import { Roles } from '../article/decorators/role.decorator';
import { RoleGuard } from '../article/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('ADMIN')
@Controller('')
export class AdminController {
  constructor(public adminService: AdminService) {}

  @Delete('category/delete/:id')
  async deleteCategory(@Param('id') id: string) {
    await this.adminService.deleteCategory(parseInt(id as string));
    return {
      message: 'کابر با موفقیت حذف شد',
    };
  }

  @Delete('categories/delete')
  async deleteCategories() {
    await this.adminService.deleteCategories();
    return {
      message: 'کابر ها با موفقیت حذف شدند ',
    };
  }

  @Delete('article/delete/:id')
  async deleteArticle(@Param('id') id: string) {
    await this.adminService.deleteArticle(parseInt(id as string));
    return {
      message: 'مقاله با موفقیت حذف شد',
    };
  }

  @Delete('articles/delete')
  async deleteArticles() {
    await this.adminService.deleteArticles();
    return {
      message: 'مقاله ها با موفقیت حذف شدند ',
    };
  }

  @Delete('user/delete/:id')
  async deleteUser(@Param('id') id: string) {
    await this.adminService.deleteUser(parseInt(id as string));
    return {
      message: 'کابر با موفقیت حذف شد',
    };
  }

  @Delete('users/delete')
  async deleteUsers() {
    await this.adminService.deleteUsers();
    return {
      message: 'کابر ها با موفقیت حذف شدند ',
    };
  }

  @Post('article/publish/:slug')
  async publishArticle(@Param('slug') slug: string) {
    await this.adminService.publishArticle(slug);
    return { message: 'مقاله منتشر شد' };
  }

  @Post('articles/publish')
  async publishArticles() {
    await this.adminService.publishArticles();
    return { message: 'مقاله ها منتشر شدند' };
  }

  @Post('article/unpublish/:slug')
  async unpublishArticle(@Param('slug') slug: string) {
    await this.adminService.unpublishArticle(slug);

    return { message: 'مقاله  با موفقیت غیر فعال شد' };
  }

  @Post('articles/unpublish')
  async unpublishArticles() {
    await this.adminService.unpublishArticles();

    return { message: 'مقاله ها  با موفقیت غیر فعال شد' };
  }
}
