import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'Id of store',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsNotEmpty()
  store_id: string;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  @IsNotEmpty()
  description: string;
}
