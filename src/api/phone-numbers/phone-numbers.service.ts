import { Injectable } from '@nestjs/common';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { PhoneNumber } from 'src/core/entities/phone-number.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumberRepository } from 'src/core/repositories/phoneNumber.repository';

@Injectable()
export class PhoneNumbersService extends BaseService<
  CreatePhoneNumberDto,
  DeepPartial<PhoneNumber>
> {
  constructor(
    @InjectRepository(PhoneNumber) repository: PhoneNumberRepository,
  ) {
    super(repository);
  }
}
