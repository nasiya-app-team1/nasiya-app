import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { SampleMessageEntity } from 'src/core/entity/sample_message.entity';
import { CreateSampleMessageDto } from './dto/create-sample_message.dto';
import { UpdateSampleMessageDto } from './dto/update-sample_message.dto';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class SampleMessagesService extends BaseService<
  CreateSampleMessageDto,
  SampleMessageEntity
> {
  constructor(
    @InjectRepository(SampleMessageEntity)
    private readonly sampleMessageRepository: Repository<SampleMessageEntity>,
    private readonly storeService: StoresService,
  ) {
    super(sampleMessageRepository);
  }

  async createSampleMessage(dto: CreateSampleMessageDto) {
    const [existingSample, existingStore] = await Promise.all([
      this.getRepository.findOne({ where: { sample: dto.sample } }),
      this.storeService.getRepository.findOneBy({ id: dto.store_id }),
    ]);

    if (!existingStore) {
      throw new BadRequestException('Related Store not found');
    }

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
    const [existingStore, existingMessage, existingSample] = await Promise.all([
      dto.store_id
        ? this.storeService.getRepository.findOneBy({ id: dto.store_id })
        : Promise.resolve(null),
      this.getRepository.findOne({ where: { sample: dto.sample } }),
      this.getRepository.findOneBy({ id }),
    ]);
    if (!existingSample) {
      throw new BadRequestException('Sample not found');
    }
    if (!existingStore) {
      throw new BadRequestException('Related store not found');
    }
    if (existingMessage) {
      throw new NotFoundException('Sample message already exists');
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
