import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { MessageEntity } from 'src/core/entity/message.entity';
import { MessageRepository } from 'src/core/repository/message.repository';

@Injectable()
export class MessagesService extends BaseService<
  CreateMessageDto,
  DeepPartial<MessageEntity>
> {
  constructor(
    @InjectRepository(MessageEntity)
    repository: MessageRepository,
  ) {
    super(repository);
  }

  async createMessage(createMessageDto: CreateMessageDto) {

    const { content } = createMessageDto;

    // Check if a message with the same content already exists
    const existingMessage = await this.repository.findOne({
      where: { content },
    });

    if (existingMessage) {
      throw new ConflictException('Message with this content already exists');
    }
    let newMessage;
    try {
      newMessage = this.repository.create({ content });
      newMessage = await this.repository.save(newMessage);
    } catch (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }
    return {
      status_code: 201,
      message: 'Message created successfully',
      data: newMessage,
    };
  }

  async updateMessage(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ) {
    const { content } = updateMessageDto;

    // Find the message by ID
    const message = await this.repository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found by ID');
    }
    // updatethe message content
    message.content = content;
    try {
      await this.repository.save(message);

    } catch (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }

    return {
      status_code: 200,
      message: 'Message updated successfully',
      data: message,
    };
  }

  // Delete a message by ID
  async deleteMessage(id: string) {
    const message = await this.repository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found by ID');
    }

    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new BadRequestException(`Error deleting message: ${error.message}`);
    }

    return {
      status_code: 200,
      message: 'Message deleted successfully',
      data: { id },
    };
  }

  // Get all messages
  async getAllMessages() {
    let messages;
    try {
      messages = await this.repository.find();
    } catch (error) {
      throw new BadRequestException(`Error fetching messages: ${error.message}`);
    }

    return {
      status_code: 200,
      message: 'Messages retrieved successfully',
      data: messages,
    };
  }

  // Get a message by ID
  async getMessageById(id: string) {
    const message = await this.repository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found by ID');
    }

    return {
      status_code: 200,
      message: 'Message retrieved successfully',
      data: message,
    };
  }
}
