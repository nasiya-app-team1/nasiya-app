import { Repository } from 'typeorm';
import { DebtorEntity } from '../entities/index.entities';

export type DebtorRepository = Repository<DebtorEntity>;
