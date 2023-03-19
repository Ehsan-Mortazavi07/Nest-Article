import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports : [PrismaModule]
})
export class UserModule {}
