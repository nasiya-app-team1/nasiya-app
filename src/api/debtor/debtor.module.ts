import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorService } from './debtor.service';
import { DebtorController } from './debtor.controller';
import { DebtorEntity } from 'src/core/entity/debtor.entity';
import { DebtorImagesModule } from '../debtor-images/debtor-images.module';
import { StoresModule } from '../stores/stores.module';
import { PhoneNumbersModule } from '../phone-numbers/phone-numbers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebtorEntity]),
    forwardRef(() => PhoneNumbersModule),
    DebtorImagesModule,
    StoresModule,
  ],
  controllers: [DebtorController],
  providers: [DebtorService],
  exports: [DebtorService],
})
export class DebtorModule {}
