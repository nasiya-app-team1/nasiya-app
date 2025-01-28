import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { MessageEntity } from 'src/core/entity/message.entity';
import { MessageRepository } from 'src/core/repository/message.repository';
import { DebtorService } from '../debtor/debtor.service';
import { StoresService } from '../stores/stores.service';
import { SampleMessagesService } from '../sample_messages/sample_messages.service';

@Injectable()
export class MessagesService extends BaseService<
  CreateMessageDto,
  DeepPartial<MessageEntity>
> {
  constructor(
    @InjectRepository(MessageEntity) repository: MessageRepository,
    private readonly storeService: StoresService,
    private readonly debtorService: DebtorService,
    private readonly sampleMessageService: SampleMessagesService,
  ) {
    super(repository);
  }
  async createMessage(dto: CreateMessageDto) {
    const [debtor, store, sampleMessage] = await Promise.all([
      this.debtorService.getRepository.findOneBy({ id: dto.debtor_id }),
      this.storeService.getRepository.findOneBy({ id: dto.store_id }),
      this.sampleMessageService.getRepository.findOneBy({
        id: dto.sample_message_id,
      }),
    ]);
    if (!debtor) {
      throw new BadRequestException('Related debtor not found');
    }
    if (!store) {
      throw new BadRequestException('Related store not found');
    }
    if (!sampleMessage) {
      throw new BadRequestException('Related sample message not found');
    }
    return await this.create(dto);
  }

  async findOneMessage(id: string) {
    const message = await this.getRepository.findOneBy({ id });
    if (!message) {
      throw new BadRequestException('Message not found');
    }
    return await this.findOneById(id);
  }

  async deleteMessage(id: string) {
    const message = await this.getRepository.findOneBy({ id });
    if (!message) {
      throw new BadRequestException('Message not found');
    }
    return await this.delete(id);
  }
}
