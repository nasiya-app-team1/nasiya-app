import { Repository } from 'typeorm';
import { DebtorEntity } from '../entities/debtor.entity';

export type DebtorRepository = Repository<DebtorEntity>;
