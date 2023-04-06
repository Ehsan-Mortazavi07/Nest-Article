import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLikeDto } from './dtos/create-like.dto';

@UseGuards(JwtAuthGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('')
  async createLike(@Req() req, @Body() createLikeDto: CreateLikeDto) {
    const like = await this.likeService.isLike(req, createLikeDto);
    return { like };
  }
}
