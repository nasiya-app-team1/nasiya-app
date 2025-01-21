import { IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsStrongPassword()
  password: string;
}
