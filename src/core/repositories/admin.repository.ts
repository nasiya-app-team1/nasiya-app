import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';

export type AdminRepository = Repository<Admin>;
