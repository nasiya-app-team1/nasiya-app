import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'src/common/decorator';

export class CreateDebtorDto {
  @ApiProperty({ description: 'Name of the customer', example: 'Test' })
  full_name: string;

  @ApiProperty({
    description: 'Address of the customer',
    example: 'Tashkent, Uz',
  })
  address: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+998901234567',
  })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    description: 'Id of store',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  store_id: string;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  description: string;
}
