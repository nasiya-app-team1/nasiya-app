import { Injectable } from '@nestjs/common';
import { CreateSampleMessageDto } from './dto/create-sample_message.dto';
import { UpdateSampleMessageDto } from './dto/update-sample_message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleMessage } from 'src/core/entity/sample_message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SampleMessagesService {
  constructor(
    @InjectRepository(SampleMessage)
    private sampleMessageRepository: Repository<SampleMessage>,
  ) {}
  async create(createSampleMessageDto: CreateSampleMessageDto) {
    const sample = await this.sampleMessageRepository.create(
      createSampleMessageDto,
    );
    await this.sampleMessageRepository.save(sample);
    return 'Sample Message Yaratildi';
  }

  async findAll() {
    const result = await this.sampleMessageRepository.find();
    if (result.length) return result;
    return `Sample Messagelar topilmadi`;
  }

  async findOne(id: string) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      return result;
    }
    return 'Sample Message topilmadi';
  }

  async update(id: string, UpdateSampleMessageDto: UpdateSampleMessageDto) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      await this.sampleMessageRepository.update(id, UpdateSampleMessageDto);
      return 'Sample Message yangilandi';
    }
    return `Yangilanadigan Sample Message topilmadi`;
  }

  async remove(id: string) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      await this.sampleMessageRepository.delete(id);
      return "Sample Message o'chirildi";
    }
    return `O'chiriladigan Sample Message topilmadi`;
  }
}
