import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsPhoneNumber } from 'src/common/decorator';

export class CreatePhoneNumberDto {
  @ApiProperty({
    description: 'Phone number',
    example: '+998901234567',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'Debtor id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsNotEmpty()
  debtor_id: string;
}
