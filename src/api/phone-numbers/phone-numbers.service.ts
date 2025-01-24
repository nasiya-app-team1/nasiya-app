import { Injectable } from '@nestjs/common';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { PhoneNumberEntity } from 'src/core/entity/phone-number.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumberRepository } from 'src/core/repository/phoneNumber.repository';

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
}
