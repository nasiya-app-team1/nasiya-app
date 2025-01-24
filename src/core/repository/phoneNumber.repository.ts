import { Repository } from 'typeorm';
import { PhoneNumberEntity } from '../entity';

export type PhoneNumberRepository = Repository<PhoneNumberEntity>;
