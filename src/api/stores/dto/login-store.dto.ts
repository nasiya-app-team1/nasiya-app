import { IsString, Length, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginStoreDto {
  @ApiProperty({
    description: 'Login name of the store',
    example: 'store_login',
  })
  @IsString()
  @Length(4, 50)
  login: string;

  @ApiProperty({
    description: 'Password of the store',
    example: 'P@ssw0rd',
  })
  @IsStrongPassword()
  password: string;
}
