import { Repository } from 'typeorm';
import { Admin } from '../entities/index.entities';

export type AdminRepository = Repository<Admin>;
