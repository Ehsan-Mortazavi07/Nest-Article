import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../article/decorators/role.decorator';
import { RoleGuard } from '../article/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditUserDto } from './dots/edit-user.dto';
import { UserService } from './user.service';
import path = require('path');
import { diskStorage } from 'multer';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

  @Get('/profile')
  profile(@Request() req) {
    return { user: req.user };
  }

  @Put('/edit')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req, file, cb) => {
          const filename = path.parse(file.originalname).name;
          const extension = path.parse(file.originalname).ext;

          return cb(null, `${filename}-${Date.now()}${extension}`);
        },
      }),

      fileFilter: (req, file, cb) => {
        const extension = path.parse(file.originalname).ext;

        if (extension === '') {
          return cb(new BadRequestException('Erorr ...'), false);
        }

        return cb(null, true);
      },
    }),
  )
  async editUserProfile(
    @Request() req,
    @Body() editUserDto: EditUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const user = await this.userService.editUserProfile(
      req,
      editUserDto,
      image,
    );
    return { user };
  }
}
