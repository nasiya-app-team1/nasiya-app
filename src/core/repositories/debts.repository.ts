import { Repository } from 'typeorm';
import { DebtEntity } from '../entities/debt.entity';

export type DebtsRepository = Repository<DebtEntity>;
