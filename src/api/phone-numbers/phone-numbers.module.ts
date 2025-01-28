import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumbersService } from './phone-numbers.service';
import { PhoneNumberEntity } from 'src/core/entity/phone-number.entity';
import { PhoneNumbersController } from './phone-number.controller';
import { DebtorModule } from '../debtor/debtor.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumberEntity]), DebtorModule],
  controllers: [PhoneNumbersController],
  providers: [PhoneNumbersService],
  exports: [PhoneNumbersService],
})
export class PhoneNumbersModule {}
