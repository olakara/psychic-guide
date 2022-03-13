import { Injectable } from '@nestjs/common';
import { DbContextService } from 'src/db-context/db-context.service';
import { AuthDto } from './dto';
@Injectable()
export class AuthService {
  constructor(private dbContext: DbContextService) {}

  public signUp(dto: AuthDto) {
    return { msg: 'I have signed up!' };
  }

  public signIn() {
    return { msg: 'I have signed in!' };
  }
}
