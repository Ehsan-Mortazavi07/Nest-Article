import { Injectable, Request } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dots/create-user.dto';
import * as bcrypt from 'bcrypt';
import { EditUserDto } from './dots/edit-user.dto';

@Injectable()
export class UserService {
  constructor(public prisma: PrismaService) {}

  async findUnique(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('چنین کاربری وجود ندارد');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const checkUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email.toLocaleLowerCase(),
      },
    });
    if (checkUser) {
      throw new BadRequestException(
        'چنین کاربری با این ایمیل قبلا ثبت‌نام کرده است',
      );
    }
    const password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        fullname: createUserDto.fullname,
        email: createUserDto.email.toLocaleLowerCase(),
        password: password,
      },
    });
    return newUser;
  }

  async editUserProfile(
    @Request() req,
    editUserDto: EditUserDto,
    image: Express.Multer.File,
  ) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });

    const checkUser = await this.prisma.user.findUnique({
      where: {
        email: editUserDto.email.toLocaleLowerCase(),
      },
    });
    if (checkUser && checkUser.id !== user.id) {
      throw new BadRequestException(
        'چنین کاربری با این ایمیل قبلا ثبت‌نام کرده است',
      );
    }

    let password = user.password;
    //Hashing password
    if (editUserDto.password) {
      password = await bcrypt.hash(editUserDto.password, 10);
    }

    await this.prisma.user.update({
      where: {
        email: req.user.email,
      },

      data: {
        fullname: editUserDto.fullname,
        email: editUserDto.email.toLocaleLowerCase(),
        image: image.path,
        password,
      },
    });

    user = await this.prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });

    return user;
  }
}
