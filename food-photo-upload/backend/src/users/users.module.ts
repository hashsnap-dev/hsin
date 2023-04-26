import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserPasswordService } from './user-password.service';

@Module({
  providers: [UsersService, UserPasswordService],
  exports: [UsersService, UserPasswordService],
  controllers: [UsersController],
})
export class UsersModule {}
