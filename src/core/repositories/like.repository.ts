import { Repository } from 'typeorm';
import { LikesEntity } from '../entities/likes.entity';

export type LikeRepository = Repository<LikesEntity>;
