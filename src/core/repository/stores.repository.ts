import { Repository } from 'typeorm';
import { Stores } from '../entity/stores.entity';
export type StoreRepository = Repository<Stores>;
