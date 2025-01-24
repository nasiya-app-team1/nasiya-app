import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { MessageEntity } from 'src/core/entity/message.entity';
import { MessageRepository } from 'src/core/repository/message.repository';

@Injectable()
export class MessagesService extends BaseService<
  CreateMessageDto,
  DeepPartial<MessageEntity>
> {
  constructor(@InjectRepository(MessageEntity) repository: MessageRepository) {
    super(repository);
  }
}
