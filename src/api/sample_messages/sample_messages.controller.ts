import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SampleMessagesService } from './sample_messages.service';
import { CreateSampleMessageDto } from './dto/create-sample_message.dto';
import { UpdateSampleMessageDto } from './dto/update-sample_message.dto';
import { Public } from 'src/common/decorator';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sample-messages') // Groups endpoints under 'Debtors' in Swagger
@Public()
@Controller('sample-messages')
export class SampleMessagesController {
  constructor(private readonly sampleMessagesService: SampleMessagesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new sample message' })
  @ApiResponse({ status: 200, description: 'Sample MessageEntity Yaratildi.' })
  create(@Body() createSampleMessageDto: CreateSampleMessageDto) {
    return this.sampleMessagesService.createSampleMessage(
      createSampleMessageDto,
    );
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all Sample-messages' })
  @ApiResponse({ status: 200, description: 'List of all Sample-messages.' })
  @ApiResponse({ status: 404, description: 'Sample Messagelar topilmadi.' })
  findAll() {
    return this.sampleMessagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a sample-message by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sample-message',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'List of the sample-message.' })
  @ApiResponse({ status: 404, description: 'Sample Message topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.sampleMessagesService.findSampleMessageById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sample-message by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sample-message to update',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Sample MessageEntity yangilandi' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({
    status: 404,
    description: 'Yangilanadigan Sample Message topilmadi.',
  })
  update(
    @Param('id') id: string,
    @Body() updateSampleMessageDto: UpdateSampleMessageDto,
  ) {
    return this.sampleMessagesService.updateSampleMessage(
      id,
      updateSampleMessageDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sample-message by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sample-message to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Sample-message deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: "O'chiriladigan Sample Message topilmadi",
  })
  remove(@Param('id') id: string) {
    return this.sampleMessagesService.deleteSampleMessage(id);
  }
}
