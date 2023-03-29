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
      message: 'گتگوری با موفقیت حذف شد',
    };
  }

  @Delete('category/delete')
  async deleteCategories() {
    await this.adminService.deleteCategories();
    return {
      message: 'گتگوری ها با موفقیت حذف شدند ',
    };
  }

  @Delete('article/delete/:id')
  async deleteArticle(@Param('id') id: string) {
    await this.adminService.deleteArticle(parseInt(id as string));
    return {
      message: 'مقاله با موفقیت حذف شد',
    };
  }

  @Delete('article/delete')
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

  @Delete('user/delete')
  async deleteUsers() {
    await this.adminService.deleteUsers();
    return {
      message: 'کابر ها با موفقیت حذف شدند ',
    };
  }

  @Post('article/publish/:id')
  async publishArticle(@Param('id') id: string) {
    await this.adminService.publishArticle(parseInt(id as string));
    return { message: 'عملیات با موفقیت انجام شد' };
  }

  @Post('article/publish')
  async publishArticles() {
    await this.adminService.publishArticles();
    return { message: 'مقاله ها منتشر شدند' };
  }

  @Post('article/unpublish')
  async unpublishArticles() {
    await this.adminService.unpublishArticles();

    return { message: 'مقاله ها  با موفقیت غیر فعال شد' };
  }
}
