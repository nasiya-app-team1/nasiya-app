import { Repository } from 'typeorm';
import { StoreEntity } from '../entities/index.entities';
export type StoreRepository = Repository<StoreEntity>;
