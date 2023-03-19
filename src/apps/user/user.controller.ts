import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../article/decorators/role.decorator';
import { RoleGuard } from '../article/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditUserDto } from './dots/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

  @Get('/profile')
  profile(@Request() req) {
    return { user: req.user };
  }
  
  @Put('/edit')
  async editUserProfile(@Request() req, @Body() editUserDto: EditUserDto) {
    const user = await this.userService.editUserProfile(req, editUserDto);
    return { user };
  }
}
