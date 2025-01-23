import { Repository } from 'typeorm';
import { SampleMessage } from '../entity/sample_message.entity';

export type SampleMessageRepository = Repository<SampleMessage>;
