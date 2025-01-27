import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DebtsPeriod } from 'src/common/enum/debts.enum';

export class CreateDebtDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Debt date for Debts', example: '2025-01-22' })
  debt_date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Debtor ID associated with this debt',
    example: 'debtor-id-123',
  })
  debtor_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Enum for Debts', example: '1 oy' })
  debt_period: DebtsPeriod;

  @IsNotEmpty()
  @ApiProperty({ description: 'Sum to Debts', example: '800000' })
  debt_sum: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Note of the customer', example: 'Test' })
  description: string;
}
