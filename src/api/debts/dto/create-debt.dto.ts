import { ApiProperty } from '@nestjs/swagger';
import { DebtsPeriod } from 'src/common/enum/debts.enum';

export class CreateDebtDto {
  @ApiProperty({ description: 'Debt date for Debts', example: '2025-01-22' })
  debt_date: Date;

  @ApiProperty({
    description: 'Debtor ID associated with this debt',
    example: 'debtor-id-123',
  })
  debtor_id: string;

  @ApiProperty({ description: 'Enum for Debts', example: '1 oy' })
  debt_period: DebtsPeriod;

  @ApiProperty({ description: 'Sum to Debts', example: '800000' })
  debt_sum: number;

  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  description: string;
}
