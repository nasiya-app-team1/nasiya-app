import { Repository } from 'typeorm';
import { DebtImageEntity } from '../entities/index.entities';

export type DebtsImageRepository = Repository<DebtImageEntity>;
