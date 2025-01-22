import { Repository } from 'typeorm';
import { PhoneNumber } from '../entities/phoneNumber.entity';

export type phoneNumberRepositoroy = Repository<PhoneNumber>;
