import { Module } from '@nestjs/common';
import { PhoneNumbersService } from './phone-numbers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberEntity } from 'src/core/entity/phone-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumberEntity])],
  controllers: [],
  providers: [PhoneNumbersService],
})
export class PhoneNumbersModule {}
