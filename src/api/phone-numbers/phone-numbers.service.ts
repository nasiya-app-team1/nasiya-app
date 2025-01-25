import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { PhoneNumberEntity } from 'src/core/entity/phone-number.entity';
import { PhoneNumberRepository } from 'src/core/repository/phoneNumber.repository';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';

@Injectable()
export class PhoneNumbersService extends BaseService<
  CreatePhoneNumberDto,
  DeepPartial<PhoneNumberEntity>
> {
  constructor(
    @InjectRepository(PhoneNumberEntity) repository: PhoneNumberRepository,
  ) {
    super(repository);
  }

  async createNumber(dto: CreatePhoneNumberDto) {
    const [debtor, existingNumber] = await Promise.all([
      this.getRepository.findOneBy({ id: dto.debtor_id }),
      this.getRepository.findOne({ where: { phone_number: dto.phone_number } }),
    ]);

    if (existingNumber) {
      throw new ConflictException('Phone number already exists');
    }

    if (!debtor) {
      throw new BadRequestException('Related debtor not found');
    }

    return await this.create(dto);
  }

  async findOneNumber(id: string) {
    const phoneNumber = await this.getRepository.findOneBy({ id });
    if (!phoneNumber) {
      throw new BadRequestException('Phone number not found');
    }

    return await this.findOneById(id);
  }

  async updateNumber(id: string, dto: UpdatePhoneNumberDto) {
    const [existingNumber, debtor] = await Promise.all([
      this.getRepository.findOneBy({ id }),
      dto.debtor_id
        ? this.getRepository.findOneBy({ id: dto.debtor_id })
        : Promise.resolve(null),
    ]);

    if (!existingNumber) {
      throw new BadRequestException('Phone number not found');
    }

    if (dto.debtor_id && !debtor) {
      throw new BadRequestException('Related debtor not found');
    }

    return await this.update(id, dto);
  }

  async deleteNumberById(id: string) {
    const phoneNumber = await this.getRepository.findOneBy({ id });
    if (!phoneNumber) {
      throw new BadRequestException('Phone number not found');
    }

    return await this.delete(id);
  }
}
