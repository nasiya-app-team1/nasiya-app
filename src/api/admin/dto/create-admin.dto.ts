import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { RoleAdmin } from 'src/common/enum';

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    description: 'Username of admin',
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
  hashed_password: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Phone number of admin',
    example: '+998901234567',
  })
  @IsOptional()
  phone_number?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Email address of admin',
    example: 'admin@example.com',
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Role of admin',
    example: 'admin',
  })
  @IsOptional()
  role?: RoleAdmin;
}
