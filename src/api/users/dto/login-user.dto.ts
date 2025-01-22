import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'username for login',
    example: 'spaccee',
  })
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'password for login',
    example: 'myP@$word1.',
  })
  @IsStrongPassword()
  password: string;
}
