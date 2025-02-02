import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Like } from 'typeorm';
import {
  DebtorRepository,
  DebtorEntity,
  PhoneNumberEntity,
  PhoneNumberRepository,
} from 'src/core';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { UpdateDebtorDto } from './dto/update-debtor.dto';

@Injectable()
export class DebtorService extends BaseService<
  CreateDebtorDto,
  DeepPartial<DebtorEntity>
> {
  constructor(
    @InjectRepository(DebtorEntity)
    repository: DebtorRepository,
    @InjectRepository(PhoneNumberEntity)
    private phoneRepository: PhoneNumberRepository,
  ) {
    super(repository);
  }

  async createDebtor(dto: CreateDebtorDto, store_id: string) {
    const debtor = await this.getRepository.save({ ...dto, store_id });
    return {
      status_code: 201,
      message: 'Created',
      data: debtor,
    };
  }

  async findAllStoreDebtors(id: string) {
    const debtors = await this.repository.find({ where: { store_id: id } });
    return {
      status_code: 200,
      message: 'Success',
      data: debtors,
    };
  }

  async searchDebtors(option: any) {
    const { full_name, phone_number, store_id } = option;

    const whereClause: any = { store_id };

    if (full_name) {
      whereClause.full_name = Like(`%${full_name}%`);
    }

    let debtors = await this.getRepository.find({
      where: whereClause,
    });

    if (phone_number) {
      const numbers = await this.phoneRepository.find({
        where: { phone_number: Like(`%${phone_number}%`) },
      });

      const debtorIds = numbers.map((num) => num.debtor_id);

      debtors = await this.getRepository.find({
        where: { id: In(debtorIds), store_id },
      });
    }
    return {
      status_code: 200,
      message: 'Success',
      data: debtors,
    };
  }

  async updateDebtor(id: string, dto: UpdateDebtorDto) {
    const debtor = await this.getRepository.findOneBy({ id });
    if (!debtor) {
      throw new BadRequestException('Debtor not found');
    }
    return await this.update(id, dto);
  }

  async findOneDebtor(id: string) {
    const debtor = await this.getRepository.findOneBy({ id });
    if (!debtor) {
      throw new BadRequestException('Debtor not found');
    }
    return await this.findOneById(id);
  }

  async deleteDebtor(id: string) {
    const debtor = await this.getRepository.findOneBy({ id });
    if (!debtor) {
      throw new BadRequestException('Debtor not found');
    }
    return await this.delete(id);
  }
}
