import {
  IsString,
  IsBoolean,
  IsUUID,
  IsOptional,
  Length,
  IsDecimal,
} from 'class-validator';

export class CreateStoreDto {
  @IsUUID()
  id: string;

  @IsString()
  @Length(1, 100)
  login: string;

  @IsString()
  @Length(1, 50)
  password: string;

  @IsDecimal()
  wallet: number;

  @IsString()
  @Length(0, 255)
  image: string;

  @IsBoolean()
  @IsOptional() // Optional if not always provided
  is_active: boolean;
}
