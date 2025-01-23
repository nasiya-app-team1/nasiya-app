import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString, IsEnum } from 'class-validator';
import { PaymentType } from 'src/common/enum/payment.enum';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'summa of payment',
    example: 100000,
  })
  @IsNumber()
  sum: number;

  @ApiProperty({
    description: 'Payed date of payment',
    example: '2025-01-23T19:49:06.798Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Type of payment',
    example: 'one_month',
  })
  @IsEnum(PaymentType)
  type: PaymentType;
}
