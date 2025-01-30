import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SampleMessagesService } from './sample_messages.service';
import { CreateSampleMessageDto } from './dto/create-sample_message.dto';
import { UpdateSampleMessageDto } from './dto/update-sample_message.dto';
import { Public, UserID } from 'src/common/decorator';

@ApiTags('Sample-messages')
@Public()
@Controller('sample-messages')
export class SampleMessagesController {
  constructor(private readonly sampleMessagesService: SampleMessagesService) {}

  @ApiOperation({ summary: 'Create a new sample message' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sample MessageEntity Yaratildi.',
    schema: {
      example: {
        status_code: 201,
        message: 'Sample-message created successfully.',
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
        message: 'Bad Request.',
        data: {},
      },
    },
  })
  @Post('create')
  async create(
    @Body() createSampleMessageDto: CreateSampleMessageDto,
    @UserID() id: string,
  ) {
    return await this.sampleMessagesService.createSampleMessage(
      createSampleMessageDto,
      id,
    );
  }

  @ApiOperation({ summary: 'Retrieve all Sample-messages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all Sample-messages.',
    schema: {
      example: {
        status_code: 200,
        message: 'Like of all Sample-messages',
        data: [
          {
            store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
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
  @Get('all')
  async findAll() {
    return await this.sampleMessagesService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a sample-message by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sample-message',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of the sample-messages.',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
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
      },
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sampleMessagesService.findSampleMessageById(id);
  }

  @ApiOperation({ summary: 'Update a sample-message by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sample-message to update',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sample-message updated succesfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'Sample-message updated successfully.',
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
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSampleMessageDto: UpdateSampleMessageDto,
  ) {
    return await this.sampleMessagesService.updateSampleMessage(
      id,
      updateSampleMessageDto,
    );
  }

  @ApiOperation({ summary: 'Delete a sample-message by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sample-message to delete',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sample-message deleted successfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'Sample-message deleted successfully.',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request.',
        data: {},
      },
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sampleMessagesService.deleteSampleMessage(id);
  }
}
