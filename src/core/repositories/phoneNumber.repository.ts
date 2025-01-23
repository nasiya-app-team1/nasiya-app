import { Repository } from 'typeorm';
import { PhoneNumber } from '../entities/phone-number.entity';

export type PhoneNumberRepository = Repository<PhoneNumber>;
