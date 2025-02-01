import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDebtDto {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'Debt date for Debts', example: '2025-01-22' })
  debt_date?: Date | string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Debtor ID associated with this debt',
    example: 'debtor-id-123',
  })
  debtor_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Month for Debts', example: 1 })
  debt_period: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Sum to Debts', example: '800000' })
  debt_sum: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  description: string;
}
