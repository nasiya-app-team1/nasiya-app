import {
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateStoreDto {
  @IsEmail()
  @IsString()
  email:string
  
  @IsString()
  @Length(1, 25)
  login: string;

  @IsString()
  @Length(1, 25)
  password: string;

  
  @IsPhoneNumber('UZ')
  phone_number:string

  @IsString()
  @MaxLength(4)
  pass_code:string

  @IsNumber()
  wallet: number;

  @IsString()
  @Length(0, 255)
  image: string;

  @IsBoolean()
  @IsOptional() // Optional if not always provided
  is_active: boolean;
}
