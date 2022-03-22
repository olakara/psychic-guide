import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbContextService } from 'src/db-context/db-context.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private dbContext: DbContextService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.dbContext.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hash;
    return user;
  }
}
