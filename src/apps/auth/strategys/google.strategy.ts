import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(public prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    token: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const newUser = await this.prisma.user.create({
      data: {
        email: emails[0].value,
        fullname: name.username,
        image: photos[0].value,
        token,
        password: profile.id,
      },
    });
    done(null, newUser);
  }
}
