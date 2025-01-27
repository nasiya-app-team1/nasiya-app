import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDebtorImageDto {
  @ApiProperty({
    description: 'Image link of debtor',
    example: '/home/lib/images/hello.png',
  })
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Debtor id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsUUID()
  @IsNotEmpty()
  debtor_id: string;
}
