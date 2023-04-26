import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }

  serializeUser(user: any, cb: (err: Error, user: any) => void) {
    cb(null, user.username);
  }
  async deserializeUser(payload: any, cb: (err: Error, payload?: any) => void) {
    try {
      const user = await this.userService.findOne(payload);
      if (!user) return cb(new Error('No user'));
      const { password, salt, ...data } = user as any;
      cb(null, data);
    } catch (err: any) {
      cb(err);
    }
  }
}
