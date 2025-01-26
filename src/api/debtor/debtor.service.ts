import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { DebtorRepository, DebtorEntity } from 'src/core';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { UpdateDebtorDto } from './dto/update-debtor.dto';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class DebtorService extends BaseService<
  CreateDebtorDto,
  DeepPartial<DebtorEntity>
> {
  constructor(
    @InjectRepository(DebtorEntity) repository: DebtorRepository,
    private readonly storeService: StoresService,
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
