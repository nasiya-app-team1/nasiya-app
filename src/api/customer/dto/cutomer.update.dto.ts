import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiPropertyOptional({ description: 'Name of the customer', example: 'Test' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Address of the customer',
    example: 'Tashkent, Uz',
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'Balance amount of the customer',
    example: 1550000.45,
  })
  balance?: number;

  @ApiPropertyOptional({ description: 'Note of the customer', example: 'Test' })
  note?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the customer is liked',
    example: false,
  })
  is_liked?: boolean;
}
