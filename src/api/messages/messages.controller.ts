import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Message created successfully.',
    schema: {
      example: {
        status_code: 201,
        message: 'Message created successfully.',
        data: {
          store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          debtor_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          message: 'is is just simple message for swagger',
          status: 'pending',
          sample_message_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @ApiOperation({ 
    summary: 'Retrieve all messages',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all messages.',
    schema: {
      example: {
        status_code: 200,
        message: 'List of all messages.',
        data: [
          {
            store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
            debtor_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
            message: 'is is just simple message for swagger',
            status: 'pending',
            sample_message_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @Get()
  async getAllMessages() {
    try{
      return await this.messagesService.findAll();
    }catch(e){
      throw new BadRequestException(`Error message: ${e.message}`);
    }
  }

  @ApiOperation({
    summary: 'Retrieve a message by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the message',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of the message.',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          debtor_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          message: 'is is just simple message for swagger',
          status: 'pending',
          sample_message_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request'
      },
    },
  })
  @Get(':id')
  async getMessageById(@Param('id') id: string) {
    return await this.messagesService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a message by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the message to update',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message updated successfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          debtor_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          message: 'is is just simple message for swagger',
          status: 'pending',
          sample_message_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
        },
      },
    },
  })  
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messagesService.update(id, updateMessageDto);
  }

  @ApiOperation({
    summary: 'Delete a message by ID',
  })  
  @ApiParam({
    name: 'id',
    description: 'The ID of the message to delete',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message deleted successfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return await this.messagesService.delete(id);
  }
}
