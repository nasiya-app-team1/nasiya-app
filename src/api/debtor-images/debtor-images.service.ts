import { Injectable } from '@nestjs/common';
import { CreateDebtorImageDto } from './dto/create-debtor-image.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { DebtorImageEntity } from 'src/core/entities/debtor-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorImageRepository } from 'src/core/repositories/debtorimage.repository';

@Injectable()
export class DebtorImagesService extends BaseService<
  CreateDebtorImageDto,
  DeepPartial<DebtorImageEntity>
> {
  constructor(
    @InjectRepository(DebtorImageEntity) repository: DebtorImageRepository,
  ) {
    super(repository);
  }
}
