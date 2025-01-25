import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { SampleMessageEntity } from 'src/core/entity/sample_message.entity';
import { CreateSampleMessageDto } from './dto/create-sample_message.dto';
import { UpdateSampleMessageDto } from './dto/update-sample_message.dto';

@Injectable()
export class SampleMessagesService extends BaseService<
  CreateSampleMessageDto,
  SampleMessageEntity
> {
  constructor(
    @InjectRepository(SampleMessageEntity)
    private readonly sampleMessageRepository: Repository<SampleMessageEntity>,
  ) {
    super(sampleMessageRepository);
  }

  async createSampleMessage(dto: CreateSampleMessageDto) {
    const existingSample = await this.getRepository.findOne({
      where: { title: dto.sample },
    });

    if (existingSample) {
      throw new ConflictException(
        'Sample message with this text already exists',
      );
    }

    return await this.create(dto);
  }

  async findSampleMessageById(id: string) {
    const sampleMessage = await this.getRepository.findOneBy({ id });
    if (!sampleMessage) {
      throw new NotFoundException('Sample message not found');
    }
    return await this.findOneById(id);
  }

  async updateSampleMessage(id: string, dto: UpdateSampleMessageDto) {
    const sampleMessage = await this.getRepository.findOneBy({ id });
    if (!sampleMessage) {
      throw new NotFoundException('Sample message not found');
    }
    return await this.update(id, dto);
  }

  async deleteSampleMessage(id: string) {
    const sampleMessage = await this.getRepository.findOneBy({ id });
    if (!sampleMessage) {
      throw new NotFoundException('Sample message not found');
    }
    return await this.delete(id);
  }
}
