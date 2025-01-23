import { Repository } from 'typeorm';
import { DebtorImage } from '../entities/debtor-image.entity';

export type DebtorImageRepository = Repository<DebtorImage>;
