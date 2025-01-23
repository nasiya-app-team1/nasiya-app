import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { PaymentType } from 'src/common/enum/payment.enum';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  sum?: number;
  date?: string;
  type?: PaymentType;
}
