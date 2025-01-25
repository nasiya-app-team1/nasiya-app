import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDebtDto } from './dto/create-debt.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtsImagesService } from '../debts-images/debts-images.service';
import { DebtEntity, DebtsRepository } from 'src/core';

@Injectable()
export class DebtsService extends BaseService<
  CreateDebtDto,
  DeepPartial<DebtEntity>
> {
  constructor(
    @InjectRepository(DebtEntity) repository: DebtsRepository,
    private readonly debtsImagesService: DebtsImagesService,
  ) {
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
