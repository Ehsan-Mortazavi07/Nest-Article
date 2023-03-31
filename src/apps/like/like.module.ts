import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [PrismaModule],
})
export class LikeModule {}
