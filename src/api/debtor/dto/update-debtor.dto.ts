import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateDebtorDto {
  @ApiProperty({ description: 'Name of the customer', example: 'Test' })
  @IsOptional()
  full_name?: string;

  @ApiProperty({
    description: 'Address of the customer',
    example: 'Tashkent, Uz',
  })
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Is like or not liked debtor', example: true })
  @IsOptional()
  is_liked?: boolean;
}
