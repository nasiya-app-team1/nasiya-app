import { Repository } from 'typeorm';
import { LikeEntity } from '../entities/index.entities';

export type LikeRepository = Repository<LikeEntity>;
