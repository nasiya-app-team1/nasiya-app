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

  @ApiProperty({
    description: 'Id of store',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsOptional()
  store_id?: string;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  @IsOptional()
  description?: string;
}
