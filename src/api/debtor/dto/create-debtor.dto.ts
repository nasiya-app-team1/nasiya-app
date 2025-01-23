import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtorDto {
  @ApiProperty({ description: 'Name of the customer', example: 'Test' })
  full_name: string;

  @ApiProperty({
    description: 'Address of the customer',
    example: 'Tashkent, Uz',
  })
  address: string;

  //store refrenses
  // store_id: string;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  description: string;
}
