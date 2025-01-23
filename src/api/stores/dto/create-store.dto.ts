import {
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @Length(1, 25)
  login: string;

  @IsString()
  @Length(1, 25)
  password: string;

  @IsNumber()
  wallet: number;

  @IsString()
  @Length(0, 255)
  image: string;

  @IsBoolean()
  @IsOptional() // Optional if not always provided
  is_active: boolean;
}
