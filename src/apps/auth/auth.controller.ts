import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Req
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dots/create-user.dto';
import { AuthService } from './auth.service';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { LoginUserDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { user, access_token } = await this.authService.register(
      createUserDto,
    );
    return { user, token: access_token };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    const { access_token } = await this.authService.login(req.user);
    return { user: req.user, token: access_token };
  }
  @Post('/forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    await this.authService.forgetPassword(forgetPasswordDto);
    return { message: 'Sent' };
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { message } = await this.authService.resetPassword(resetPasswordDto);
    return { message: message };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logoutBackEnd(@Request() req) {
    await this.authService.logoutBackEnd(req.user.id, req.user.email);
    return 'User Logouted';
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
