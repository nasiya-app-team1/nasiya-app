import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ description: 'Name of the customer', example: 'Test' })
  name: string;

  @ApiProperty({
    description: 'Address of the customer',
    example: 'Tashkent, Uz',
  })
  address: string;

  @ApiProperty({
    description: 'Balance amount of the customer',
    example: 1550000.45,
  })
  balance: number;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  note: string;

  @ApiProperty({
    description: 'Indicates if the customer is liked',
    example: false,
  })
  is_liked: boolean;
}
