import { Module } from '@nestjs/common';
import { PhoneNumbersService } from './phone-numbers.service';
import { PhoneNumbersController } from './phone-numbers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberEntity } from 'src/core/entities/phone-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumberEntity])],
  controllers: [PhoneNumbersController],
  providers: [PhoneNumbersService],
})
export class PhoneNumbersModule {}
