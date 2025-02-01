import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserID } from 'src/common/decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Message created successfully.',
    schema: {
      example: {
        status_code: 201,
        message: 'Created',
        data: {
          store_id: '64efa2f4-665c-4dfe-984e-ea852c03dd10',
          debtor_id: '97d74dd9-5b1b-43f7-a4a1-ba97db6cd814',
          message:
            "Assalomu alaykum! Eslatma: 05 Sentyabr kuni 800.000 so'm miqdordagi oylik to'lovingizni amalga oshirishingizni so'raymiz. O'z vaqtida to'lov qilishni unutmang. Raxmat",
          status: 'pending',
          sample_message_id: '063ddb0d-678f-467a-b05e-d2d37f6fb3c4',
          id: 'a7f98405-8147-41d0-82da-fbf86e0cd36f',
          created_at: '2025-01-27',
          updated_at: '2025-01-27',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidDebtor: {
            summary: 'Invalid debtor',
            value: {
              message: 'Related debtor not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidSampleMessage: {
            summary: 'Invalid sampleMessage',
            value: {
              message: 'Related sample message not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    schema: {
      example: {
        status_code: 409,
        message: 'Conflict',
      },
    },
  })
  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @UserID() id: string,
  ) {
    return await this.messagesService.createMessage(createMessageDto, id);
  }

  @ApiOperation({
    summary: 'Retrieve a message by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the message',
    type: String,
    example: '9e26f495-1ab6-4c85-860d-5b2e8d307a5a',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of the message.',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: {
          id: '9e26f495-1ab6-4c85-860d-5b2e8d307a5a',
          created_at: '2025-01-27',
          updated_at: '2025-01-27',
          store_id: '64efa2f4-665c-4dfe-984e-ea852c03dd10',
          debtor_id: '97d74dd9-5b1b-43f7-a4a1-ba97db6cd814',
          message:
            "Assalomu alaykum! Eslatma: 05 Sentyabr kuni 800.000 so'm miqdordagi oylik to'lovingizni amalga oshirishingizni so'raymiz. O'z vaqtida to'lov qilishni unutmang. Raxmat",
          status: 'pending',
          sample_message_id: '063ddb0d-678f-467a-b05e-d2d37f6fb3c4',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'not found',
            value: {
              message: 'Message not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Get(':id')
  async getMessageById(@Param('id') id: string) {
    return await this.messagesService.findOneMessage(id);
  }

  @ApiOperation({
    summary: 'Delete a message by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the message to delete',
    type: String,
    example: '9e26f495-1ab6-4c85-860d-5b2e8d307a5a',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message deleted successfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'Deleted',
        data: {
          id: 'bc6d7f35-6f23-41de-9855-1c211aeb16c7',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'not found',
            value: {
              message: 'Message not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return await this.messagesService.deleteMessage(id);
  }
}
