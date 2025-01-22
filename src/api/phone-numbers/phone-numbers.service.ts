import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { PhoneNumber } from 'src/core/entities/phoneNumber.entity';

@Injectable()
export class PhoneNumbersService {
  constructor(
    @InjectRepository(PhoneNumber)
    private phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  async create(
    createPhoneNumberDto: CreatePhoneNumberDto,
  ): Promise<PhoneNumber> {
    const phoneNumber = this.phoneNumberRepository.create(createPhoneNumberDto);
    return await this.phoneNumberRepository.save(phoneNumber);
  }

  async findAll(): Promise<PhoneNumber[]> {
    return await this.phoneNumberRepository.find();
  }

  async findOne(id: string): Promise<PhoneNumber> {
    const phoneNumber = await this.phoneNumberRepository.findOne({
      where: { id },
    });
    if (!phoneNumber) {
      throw new NotFoundException(`Phone number with ID ${id} not found`);
    }
    return phoneNumber;
  }

  async update(
    id: string,
    updatePhoneNumberDto: UpdatePhoneNumberDto,
  ): Promise<PhoneNumber> {
    const phoneNumber = await this.findOne(id);
    return this.phoneNumberRepository.save({
      ...phoneNumber,
      ...updatePhoneNumberDto,
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.phoneNumberRepository.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException(`Phone number with ID ${id} not found`);
  }
}
