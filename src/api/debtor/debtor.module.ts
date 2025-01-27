import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorService } from './debtor.service';
import { DebtorController } from './debtor.controller';
import { DebtorEntity } from 'src/core/entity/debtor.entity';
import { DebtorImagesModule } from '../debtor-images/debtor-images.module';
import { PhoneNumbersModule } from '../phone-numbers/phone-numbers.module';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebtorEntity]),
    DebtorImagesModule,
    PhoneNumbersModule,
    StoresModule,
  ],
  controllers: [DebtorController],
  providers: [DebtorService],
  exports: [DebtorService]
  exports: [DebtorService],
})
export class DebtorModule {}
