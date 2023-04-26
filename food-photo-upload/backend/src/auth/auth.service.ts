import { Injectable } from '@nestjs/common';
import { UserPasswordService } from 'src/users/user-password.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private userPasswordService: UserPasswordService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (
      user &&
      this.userPasswordService.validPassword(password, user.password, user.salt)
    ) {
      const { password, salt, ...data } = user as typeof user & {
        _id: any;
      };
      return data;
    }
    return null;
  }
}
