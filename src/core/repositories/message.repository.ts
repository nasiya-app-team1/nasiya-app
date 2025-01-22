import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';

export type MessageRepository = Repository<Message>;
