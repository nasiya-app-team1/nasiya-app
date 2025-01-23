import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Public } from 'src/common/decorator/jwt-public.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Public()
  @Get()
  async getAllMessages() {
    return await this.messagesService.findAll();
  }

  @Get(':id')
  async getMessageById(@Param('id') id: string) {
    return await this.messagesService.findOneById(id);
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return await this.messagesService.delete(id);
  }
}
