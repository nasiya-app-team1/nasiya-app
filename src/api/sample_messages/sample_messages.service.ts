import { HttpException, Injectable } from '@nestjs/common';
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
    throw new HttpException('Sample Messagelar topilmadi', 404) 
   }

  async findOne(id: string) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      return result;
    }
    throw new HttpException('Sample Message topilmadi', 404)  }

  async update(id: string, UpdateSampleMessageDto: UpdateSampleMessageDto) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      await this.sampleMessageRepository.update(id, UpdateSampleMessageDto);
      return 'Sample MessageEntity yangilandi';
    }
    throw new HttpException('Yangilanadigan Sample Message topilmadi', 404)  }

  async remove(id: string) {
    const result = await this.sampleMessageRepository.findOne({
      where: { id },
    });
    if (result) {
      await this.sampleMessageRepository.delete(id);
      return "Sample MessageEntity o'chirildi";
    }
    throw new HttpException("O'chiriladigan Sample Message topilmadi", 404)  }
}
