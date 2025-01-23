import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';

export type MessageRepository = Repository<MessageEntity>;
