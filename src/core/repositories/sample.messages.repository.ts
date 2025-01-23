import { Repository } from 'typeorm';
import { SampleMessage } from '../entities/sample_message.entity';

export type SampleMessageRepository = Repository<SampleMessage>;
