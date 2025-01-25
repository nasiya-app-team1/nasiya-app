import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { DebtorEntity } from 'src/core/entity/debtor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorRepository } from 'src/core/repository/debtor.repository';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtsService extends BaseService<
  CreateDebtDto,
  DeepPartial<DebtorEntity>
> {
  constructor(@InjectRepository(DebtorEntity) repository: DebtorRepository) {
    super(repository);
  }
  async createDebt(dto: CreateDebtDto) {
    const debtor = await this.getRepository.findOneBy({ id: dto.debtor_id });
    if (!debtor) {
      throw new BadRequestException('Debtor not found');
    }
    return await this.create(dto);
  }

  async updateDebt(id: string, dto: UpdateDebtDto) {
    const [debt, relatedDebt] = await Promise.all([
      this.getRepository.findOneBy({ id }),
      dto.debtor_id
        ? this.getRepository.findOneBy({ id: dto.debtor_id })
        : Promise.resolve(null),
    ]);
    if (!debt) {
      throw new BadRequestException('Debt not found');
    }
    if (dto.debtor_id && !relatedDebt) {
      throw new BadRequestException('Related debtor not found');
    }

    return await this.update(id, dto);
  }

  async findOneDebtById(id: string) {
    const debt = await this.getRepository.findOneBy({ id });
    if (!debt) {
      throw new BadRequestException('Debt not found');
    }
    return await this.findOneById(id);
  }

  async deleteDebtById(id: string) {
    const debt = await this.getRepository.findOneBy({ id });
    if (!debt) {
      throw new BadRequestException('Debt not found');
    }
    return await this.delete(id);
  }
}
