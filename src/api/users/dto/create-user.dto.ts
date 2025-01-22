import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for user',
    example: 'spaccee11',
  })
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'Strong password for user',
    example: false,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: "status user's payment (payed or not payed)",
    example: true,
  })
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({
    description: "user's balance",
    example: 100.5,
  })
  @IsNotEmpty()
  balance: number;

  @ApiProperty({
    description: "user's email",
    example: 'space@gmail.com',
  })
  @IsEmail()
  email: string;
}
