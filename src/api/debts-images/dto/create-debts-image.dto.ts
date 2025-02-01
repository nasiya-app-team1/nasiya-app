import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDebtsImageDto {
  @ApiProperty({
    description: 'Image link of debt',
    example: '/home/lib/images/hello.png',
  })
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Debt id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsNotEmpty()
  debt_id: string;
}
