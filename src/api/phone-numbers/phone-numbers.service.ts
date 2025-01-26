import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { PhoneNumberEntity } from 'src/core/entity/phone-number.entity';
import { PhoneNumberRepository } from 'src/core/repository/phoneNumber.repository';
import { BaseService } from 'src/infrastructure/baseService/baseService';

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

  async createNumbers(dto: CreatePhoneNumberDto) {
    const { debtor_id, phone_numbers } = dto;

    const [debtor, existingNumbers] = await Promise.all([
      this.getRepository.findOneBy({ id: debtor_id }),
      this.getRepository.find({
        where: { phone_number: phone_numbers },
        select: ['phone_number'],
      }),
    ]);

    if (!debtor) {
      throw new BadRequestException('Debtor with the given ID not found');
    }

    if (existingNumbers.length > 0) {
      const existingNumbersList = existingNumbers.map(
        (item) => item.phone_number,
      );
      throw new ConflictException(
        `The following phone numbers already exist: ${existingNumbersList.join(', ')}`,
      );
    }
    const newNumbers = phone_numbers.map((phone) => ({
      phone_number: phone,
      debtor_id,
    }));

    const phoneNumbers = await this.getRepository.save(newNumbers);
    return {
      status_code: 201,
      message: 'Created',
      data: phoneNumbers,
    };
  }

  async findOneByUserId(id: string) {
    const phoneNumbers = await this.getRepository.find({
      where: { debtor_id: id },
    });
    if (phoneNumbers.length === 0) {
      throw new BadRequestException(
        'Phone numbers not found with this debtor_id',
      );
    }

    return {
      status_code: 201,
      message: 'sucess',
      data: phoneNumbers,
    };
  }
  async findOne(id: string) {
    const phoneNumber = await this.getRepository.find({
      where: { id },
    });
    if (!phoneNumber) {
      throw new BadRequestException('Phone number not found');
    }

    return {
      status_code: 200,
      message: 'sucess',
      data: phoneNumber,
    };
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
