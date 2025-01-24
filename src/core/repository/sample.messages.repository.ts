import { Repository } from 'typeorm';
import { SampleMessageEntity } from '../entity';

export type SampleMessageRepository = Repository<SampleMessageEntity>;
