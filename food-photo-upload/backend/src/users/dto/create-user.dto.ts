import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: string;

  phone: string;

  name: string;

  deletable: boolean;
}
