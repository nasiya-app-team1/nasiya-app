import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorRepository } from 'src/core/repository/debtor.repository';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { DebtorEntity } from 'src/core/entity/debtor.entity';

@Injectable()
export class DebtorService extends BaseService<
  CreateDebtorDto,
  DeepPartial<DebtorEntity>
> {
  constructor(@InjectRepository(DebtorEntity) repository: DebtorRepository) {
    super(repository);
  }
}
