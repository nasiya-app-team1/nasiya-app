import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { DebtorEntity } from 'src/core/entity/debtor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorRepository } from 'src/core/repository/debtor.repository';

@Injectable()
export class DebtsService extends BaseService<
  CreateDebtDto,
  DeepPartial<DebtorEntity>
> {
  constructor(@InjectRepository(DebtorEntity) repository: DebtorRepository) {
    super(repository);
  }
}
