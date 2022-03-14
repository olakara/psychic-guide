import { Injectable } from '@nestjs/common';
import { DbContextService } from 'src/db-context/db-context.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private dbContext: DbContextService) {}

  public async signUp(dto: AuthDto) {
    // generate hash
    const hash = await argon.hash(dto.password);
    // save the user in finance department in db
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
  }

  public signIn() {
    return { msg: 'I have signed in!' };
  }
}
