import { Repository } from 'typeorm';
import { Stores } from '../entities/stores.entity';
export type StoreRepository = Repository<Stores>;
