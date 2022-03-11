import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public signUp() {
    return { msg: 'I have signed up!' };
  }
  public signIn() {
    return { msg: 'I have signed in!' };
  }
}
