import { Repository } from 'typeorm';
import { PhoneNumberEntity } from '../entities/index.entities';

export type PhoneNumberRepository = Repository<PhoneNumberEntity>;
