import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/index.entities';

export type MessageRepository = Repository<MessageEntity>;
