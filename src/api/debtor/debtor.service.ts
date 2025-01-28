import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Like } from 'typeorm';
import { DebtorRepository, DebtorEntity } from 'src/core';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { UpdateDebtorDto } from './dto/update-debtor.dto';
import { StoresService } from '../stores/stores.service';
import { PhoneNumbersService } from '../phone-numbers/phone-numbers.service';

@Injectable()
export class DebtorService extends BaseService<
  CreateDebtorDto,
  DeepPartial<DebtorEntity>
> {
  constructor(
    @Inject(forwardRef(() => PhoneNumbersService))
    @InjectRepository(DebtorEntity)
    repository: DebtorRepository,
    private readonly storeService: StoresService,
    private readonly phoneService: PhoneNumbersService,
  ) {
    super(repository);
  }

  async createDebtor(dto: CreateDebtorDto) {
    const store = await this.storeService.getRepository.findOneBy({
      id: dto.store_id,
    });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    return await this.create(dto);
  }

  async findAllStoreDebtors(id: string) {
    const debtors = await this.getRepository.find({ where: { store_id: id } });
    return {
      status_code: 200,
      message: 'Success',
      data: debtors,
    };
  }

  async searchDebtors(option: any) {
    const { full_name, phone_number } = option;

    const filters: any = {};
    const numberFilter: any = {};
    const debtorId = [];
    let debtors;

    if (full_name) {
      filters.full_name = Like(`%${full_name}%`);
      debtors = await this.getRepository.find({
        where: filters,
      });
    }

    if (phone_number) {
      numberFilter.phone_number = Like(`%${phone_number}%`);
      const numbers = await this.phoneService.getRepository.find({
        where: numberFilter,
      });
      for (let i = 0; i < numbers.length; i++) {
        debtorId.push(numbers[i].id);
      }

      debtors = await this.getRepository.find({ where: { id: In(debtorId) } });
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
    if (dto.store_id) {
      const store = await this.getRepository.findOneBy({ id: dto?.store_id });
      if (!store) {
        throw new BadRequestException('Sotre not found');
      }
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
