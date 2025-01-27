import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsPhoneNumbers } from 'src/common/decorator';

export class CreatePhoneNumberDto {
  @ApiProperty({
    description: 'Phone numbers',
    example: '[+998901234567, +998901234568]',
  })
  @IsPhoneNumbers()
  phone_numbers: string[];

  @ApiProperty({
    description: 'Debtor id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsUUID()
  @IsNotEmpty()
  debtor_id: string;
}
