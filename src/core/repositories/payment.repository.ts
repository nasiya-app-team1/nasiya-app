import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
export type PaymentRepository = Repository<Payment>;
