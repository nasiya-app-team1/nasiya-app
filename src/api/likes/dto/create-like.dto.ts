import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({
    description: 'Store id',
    example: '64efa2f4-665c-4dfe-984e-ea852c03dd10',
  })
  @IsOptional()
  @IsString()
  store_id: string;

  @ApiProperty({
    description: 'Debtor id',
    example: '415d8a85-a090-479e-bd5c-1d7a0e89c7eb',
  })
  @IsOptional()
  @IsString()
  debtor_id: string;
}
