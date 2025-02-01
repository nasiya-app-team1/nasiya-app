import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { RoleAdmin } from 'src/common/index.common';

export class UpdateAdminDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Username of admin',
    example: 'admin1',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  username?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Password of admin',
    example: 'Admin123!',
  })
  @IsOptional()
  @IsStrongPassword()
  hashed_password?: string;

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
