import { Body, Controller, Post,UseGuards } from '@nestjs/common';
import { Roles } from '../article/decorators/role.decorator';
import { RoleGuard } from '../article/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(public categoryService: CategoryService) {}

  @UseGuards(RoleGuard)
  @Roles('ADMIN', 'EDITOR')
  @Post('/create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.createCategory(
      createCategoryDto,
    );

    return { category }
  }
}
