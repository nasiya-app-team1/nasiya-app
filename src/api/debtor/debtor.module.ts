import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorService } from './debtor.service';
import { DebtorController } from './debtor.controller';
import { DebtorEntity } from 'src/core/entity/debtor.entity';
import { DebtorImagesModule } from '../debtor-images/debtor-images.module';
import { PhoneNumbersModule } from '../phone-numbers/phone-numbers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebtorEntity]),
    DebtorImagesModule,
    PhoneNumbersModule,
  ],
  controllers: [DebtorController],
  providers: [DebtorService],
})
export class DebtorModule {}
