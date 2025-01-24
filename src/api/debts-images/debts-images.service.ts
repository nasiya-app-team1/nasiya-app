import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDebtsImageDto } from './dto/create-debts-image.dto';
import { DebtImageEntity } from 'src/core/entity/debt-image.entity';
import { DebtsImageRepository } from 'src/core/repository/debt.repository';

@Injectable()
export class DebtsImagesService extends BaseService<
  CreateDebtsImageDto,
  DeepPartial<DebtImageEntity>
> {
  constructor(
    @InjectRepository(DebtImageEntity) repository: DebtsImageRepository,
  ) {
    super(repository);
  }
}
