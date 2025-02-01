import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDebtorDto {
  @ApiProperty({ description: 'Name of the customer', example: 'Test' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: 'Address of the customer',
    example: 'Tashkent, Uz',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Is like or not liked debtor', example: true })
  @IsOptional()
  is_liked?: boolean;
}
