import { Repository } from "typeorm";
import { MessageEntity } from "../entity/message.entity";

export type MessageRepository = Repository<MessageEntity>;