import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbContextService } from 'src/db-context/db-context.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private dbContext: DbContextService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  public async signUp(dto: AuthDto) {
    // generate hash
    const hash = await argon.hash(dto.password);
    // save the user in finance department in db
    try {
      const user = await this.dbContext.user.create({
        data: {
          email: dto.email,
          hash,
          departmentId: 'da482614-80b5-41f1-aba9-055586d0f8f7',
        },
      });

      delete user.hash;
      // return user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already exists!');
        }
      }
    }
  }

  public async signIn(dto: AuthDto) {
    //find user by email
    const user = await this.dbContext.user.findUnique({
      where: { email: dto.email },
      include: {
        department: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('Wrong credentials!');
    }

    //check password
    const isValidPassword = await argon.verify(user.hash, dto.password);

    if (!isValidPassword) {
      throw new ForbiddenException('Wrong credential!');
    }

    //send back the user with JWT
    const data = {
      email: user.email,
      name: user.firstName,
      access_token: await this.signToken(user.id, user.email),
    };
    return data;
  }

  async signToken(userId: string, email: string): Promise<string> {
    const data = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(data, {
      expiresIn: '5m',
      secret: this.config.get('SECRET'),
    });
  }
}
