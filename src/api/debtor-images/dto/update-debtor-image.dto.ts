import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateDebtorImageDto {
  @ApiProperty({
    description: 'Image link of debt',
    example: '/home/lib/images/hello.png',
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Debtor id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsOptional()
  debtor_id?: string;
}
