import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export type UserRepositoroy = Repository<User>;
