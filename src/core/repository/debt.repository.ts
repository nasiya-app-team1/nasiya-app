import { Repository } from 'typeorm';
import { DebtEntity } from '../entity';

export type DebtsRepository = Repository<DebtEntity>;
