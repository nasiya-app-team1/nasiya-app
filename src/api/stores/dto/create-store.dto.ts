import {
  IsString,
  IsBoolean,
  Length,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({
    description: 'Email address of the store',
    example: 'store@example.com',
  })
  @IsEmail()
  @IsString()
  email: string;

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

  @ApiProperty({
    description: 'Phone number of the store',
    example: '+998901234567',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    description: 'Pass code of the store',
    example: '1234',
  })
  @IsString()
  @MaxLength(4)
  pass_code: string;

  @ApiProperty({
    description: 'Wallet balance of the store',
    example: 1000,
  })
  @IsNumber()
  wallet: number;

  @ApiProperty({
    description: 'Image URL of the store',
    example: 'https://example.com/image.png',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Activation status of the store',
    example: true,
  })
  @IsBoolean()
  is_active: boolean;
}
