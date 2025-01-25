import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
import { IsPhoneNumber } from 'src/common/decorator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @ApiProperty({
    description: 'Email address of the store',
    example: 'store@example.com',
  })
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Login name of the store',
    example: 'store_login',
  })
  @IsString()
  @Length(1, 25)
  @IsOptional()
  login?: string;

  @ApiProperty({
    description: 'Password of the store',
    example: 'P@ssw0rd',
  })
  @IsStrongPassword()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Phone number of the store',
    example: '+998901234567',
  })
  @IsPhoneNumber()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({
    description: 'Pass code of the store',
    example: '1234',
  })
  @IsString()
  @MaxLength(4)
  @IsOptional()
  pass_code?: string;

  @ApiProperty({
    description: 'Wallet balance of the store',
    example: 1000,
  })
  @IsOptional()
  wallet?: number;

  @ApiProperty({
    description: 'Image URL of the store',
    example: 'https://example.com/image.png',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Activation status of the store',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
