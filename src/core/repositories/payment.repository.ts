import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/index.entities';
export type PaymentRepository = Repository<PaymentEntity>;
