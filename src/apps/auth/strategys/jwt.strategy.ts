import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './../constants';
import { AuthService } from './../auth.service';
import { IJwtPayload } from './../interfaces/user.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public authService: AuthService, public prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    await this.authService.validateUserByToken(payload.sub);

    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(payload.sub as string),
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
