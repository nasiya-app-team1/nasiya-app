import {
  IsNumber,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PaymentType } from 'src/common/enum/payment.enum';

export class CreatePaymentDto {
  @IsNumber()
  sum: number;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsEnum(PaymentType)
  type: PaymentType;
}
