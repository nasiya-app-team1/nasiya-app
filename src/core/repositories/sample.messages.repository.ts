import { Repository } from 'typeorm';
import { SampleMessageEntity } from '../entities/index.entities';

export type SampleMessageRepository = Repository<SampleMessageEntity>;
