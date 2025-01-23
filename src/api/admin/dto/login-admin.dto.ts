import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    type: String,
    description: 'Username admin for login',
    example: 'admin1',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password of admin',
    example: 'Admin123!',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
