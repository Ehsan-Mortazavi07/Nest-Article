import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async showArticles() {
    const articles = await this.appService.showArticles();
    return { articles };
  }
}
