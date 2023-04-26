import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UserPasswordService {
  public validPassword(password: string, hash: string, salt: string) {
    const c = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');

    return c === hash;
  }
  public createPassword(password: string) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');

    return {
      salt,
      hash,
    };
  }
}
