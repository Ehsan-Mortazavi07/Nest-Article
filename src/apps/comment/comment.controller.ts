import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async comment(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentService.createComment(
      req,
      createCommentDto,
    );
    return { comment };
  }
}
