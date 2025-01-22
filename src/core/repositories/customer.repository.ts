import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';

export type CustomerRepository = Repository<CustomerEntity>;
