import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDebtsImageDto } from './dto/create-debts-image.dto';
import { DebtsImage } from 'src/core/entities/debts-image.entity';
import { DebtsImageRepository } from 'src/core/repositories/debts.repository';

@Injectable()
export class DebtsImagesService extends BaseService<
  CreateDebtsImageDto,
  DeepPartial<DebtsImage>
> {
  constructor(@InjectRepository(DebtsImage) repository: DebtsImageRepository) {
    super(repository);
  }
}
