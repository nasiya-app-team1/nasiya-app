import { Injectable } from '@nestjs/common';
import { CreateSampleMessageDto } from './dto/create-sample_message.dto';
import { UpdateSampleMessageDto } from './dto/update-sample_message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleMessageEntity } from 'src/core/entity/sample_message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SampleMessagesService {
  constructor(
    @InjectRepository(SampleMessageEntity)
    private sampleMessageRepository: Repository<SampleMessageEntity>,
  ) {}
  async create(createSampleMessageDto: CreateSampleMessageDto) {
    const sample = await this.sampleMessageRepository.create(
      createSampleMessageDto,
    );
    await this.sampleMessageRepository.save(sample);
    return 'Sample MessageEntity Yaratildi';
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
    return 'Sample MessageEntity topilmadi';
  }

  async update(id: string, UpdateSampleMessageDto: UpdateSampleMessageDto) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      await this.sampleMessageRepository.update(id, UpdateSampleMessageDto);
      return 'Sample MessageEntity yangilandi';
    }
    return `Yangilanadigan Sample MessageEntity topilmadi`;
  }

  async remove(id: string) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      await this.sampleMessageRepository.delete(id);
      return "Sample MessageEntity o'chirildi";
    }
    return `O'chiriladigan Sample MessageEntity topilmadi`;
  }
}
