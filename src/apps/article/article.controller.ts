import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { Roles } from './decorators/role.decorator';
import { CreateArticleDto } from './dtos/create-article.dto';
import { EditArticleDto } from './dtos/edit-article.dto';
import { RoleGuard } from './guards/role.guard';

@Controller('article')
export class ArticleController {
  constructor(public articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'EDITOR')
  @Post('/create')
  async createArticle(@Body() CreateArticleDto: CreateArticleDto, @Req() req) {
    const article = await this.articleService.createArticle(
      CreateArticleDto,
      req,
    );
    return { article };
  }

  @Get('/all')
  async showAll(@Query('page') page, @Query('limit') limit) {
    const articles = await this.articleService.showAll(page, limit);
    return articles;
  }
  @UseGuards(JwtAuthGuard)
  @Get(':slug')
  async showOne(@Param('slug') slug: string, @Req() req) {
    const { article } = await this.articleService.showOne(slug, req);
    return article;
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'EDITOR')
  @Put('/edit/:id')
  async editArticle(
    @Req() req,
    @Param('id') id: string,
    @Body() EditArticleDto: EditArticleDto,
  ) {
    const article = await this.articleService.editArticle(
      req,
      EditArticleDto,
      parseInt(id as string),
    );
    return { article };
  }
}
