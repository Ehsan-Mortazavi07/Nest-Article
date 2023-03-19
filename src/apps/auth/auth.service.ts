import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dots/create-user.dto';
import { IJwtPayload, IUser } from './interfaces/user.interface';
import { UserService } from './../user/user.service';
import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    public prisma: PrismaService,
    public jwtService: JwtService,
    public userService: UserService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    const payload: IJwtPayload = {
      email: user.email,
      sub: user.id.toString(),
    };
    const token = this.jwtService.sign(payload);

    await this.prisma.user.update({
      where: {
        email: user.email,
      },

      data: {
        token,
      },
    });

    return {
      user: user,
      access_token: token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUnique(email.toLocaleLowerCase());

    //Checking user exist
    if (!user) {
      return undefined;
    }

    //Checking user password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('پسورد اشتباه است');
    }

    return user;
  }

  async validateUserByToken(id: number | string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!user || user.token == null) {
      throw new UnauthorizedException('چنین کاربری وجود ندارد');
    }

    return user;
  }

  async login(user: IUser) {
    const payload: IJwtPayload = {
      email: user.email.toLocaleLowerCase(),
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);

    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        token,
      },
    });

    return {
      access_token: token,
    };
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });
    if (!user) {
      throw new NotFoundException('چنین کاربری با این ایمیل وجود ندارد');
    }
    const activationCode = await this.prisma.activationCode.findMany({
      where: { email: email.toLocaleLowerCase(), used: false },
      take: -1,
    });

    if (
      activationCode.length !== 0 &&
      new Date(parseInt(activationCode[0]?.expire)) > new Date()
    ) {
      throw new UnauthorizedException(
        'ایمیل بازیابی به تازگی برای شما ارسال شده است',
      );
    }

    const code = uuidv4();
    const newActivationCode = await this.prisma.activationCode.create({
      data: {
        email: email.toLocaleLowerCase(),
        code: code,
        expire: (Date.now() + 1000 * 60 * 2).toString(),
      },
    });

    //Sending Email
    // await this.mailService.sendUserResetPassword(user, code);

    return newActivationCode;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, code, password } = resetPasswordDto;

    const activationCode = await this.prisma.activationCode.findFirst({
      where: {
        email: email.toLocaleLowerCase(),
        code,
      },
    });

    if (!activationCode) {
      throw new UnauthorizedException('مشخصات وارد شده نادرست است');
    }

    if (new Date(parseInt(activationCode.expire)) < new Date()) {
      throw new UnauthorizedException('لینک منقضی شده است');
    }

    if (activationCode.used) {
      throw new UnauthorizedException('این لینک قبلا استفاده شده است');
    }

    //Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });

    if (!user) {
      throw new NotFoundException('کاربر پیدا نشد');
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    await this.prisma.activationCode.update({
      where: {
        id: activationCode.id,
      },
      data: {
        used: true,
      },
    });

    return { message: 'Your password has updated' };
  }

  async logoutBackEnd(id: number, email: string) {
    await this.prisma.user.update({
      where: {
        id,
        email,
      },
      data: {
        token: null,
      },
    });

    return 'User Logouted';
  }

  googleLogin(req) {
    if (!req.user) {
      return 'کاربر از گوگل نیست';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
