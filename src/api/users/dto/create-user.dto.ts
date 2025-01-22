import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  balance: number;

  @IsEmail()
  email: string;
}
