import { Module } from '@nestjs/common';
import { PhoneNumbersService } from './phone-numbers.service';
import { PhoneNumbersController } from './phone-numbers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from 'src/entities/phoneNumber.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PhoneNumber])],
  controllers: [PhoneNumbersController],
  providers: [PhoneNumbersService],
})
export class PhoneNumbersModule {}
