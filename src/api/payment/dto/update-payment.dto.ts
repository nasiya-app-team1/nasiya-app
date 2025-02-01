import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { PaymentType } from 'src/common/enum/payment.enum';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({
    description: 'summa of payment',
    example: 100000,
  })
  @IsNumber()
  @IsOptional()
  sum?: number;

  @ApiProperty({
    description: 'Payed date of payment',
    example: '2025-01-23T19:49:06.798Z',
  })
  @IsOptional()
  date?: string;

  @ApiProperty({
    description: 'Debtor id it is related to debt',
    example: '21f0f523-6ef8-473b-be9a-2477962fcaeb',
  })
  @IsOptional()
  @IsUUID()
  debt_id?: string;

  @ApiProperty({
    description: 'Type of payment',
    example: 'one_month',
  })
  @IsOptional()
  @IsEnum(PaymentType)
  type?: PaymentType;
}
