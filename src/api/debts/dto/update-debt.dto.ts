import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DebtsPeriod } from 'src/common/enum';

export class UpdateDebtDto {
  @ApiProperty({ description: 'Debt date for Debts', example: '2025-01-22' })
  @IsOptional()
  debt_date?: Date;

  @ApiProperty({
    description: 'Debtor ID associated with this debt',
    example: 'debtor-id-123',
  })
  @IsOptional()
  debtor_id?: string;

  @ApiProperty({ description: 'Enum for Debts', example: '1 oy' })
  @IsOptional()
  debt_period?: DebtsPeriod;

  @ApiProperty({ description: 'Sum to Debts', example: '800000' })
  @IsOptional()
  debt_sum?: number;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  @IsOptional()
  description?: string;
}
