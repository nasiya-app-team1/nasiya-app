import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SampleMessagesService } from './sample_messages.service';
import { CreateSampleMessageDto } from './dto/create-sample_message.dto';
import { UpdateSampleMessageDto } from './dto/update-sample_message.dto';

@Controller('sample-messages')
export class SampleMessagesController {
  constructor(private readonly sampleMessagesService: SampleMessagesService) {}

  @Post()
  create(@Body() createSampleMessageDto: CreateSampleMessageDto) {
    return this.sampleMessagesService.create(createSampleMessageDto);
  }

  @Get()
  findAll() {
    return this.sampleMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleMessagesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSampleMessageDto: UpdateSampleMessageDto,
  ) {
    return this.sampleMessagesService.update(id, updateSampleMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleMessagesService.remove(id);
  }
}
