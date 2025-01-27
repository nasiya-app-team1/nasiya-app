import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsService } from './debts.service';
import { DebtEntity } from 'src/core/entity/debt.entity';
import { DebtsImagesModule } from '../debts-images/debts-images.module';
import { DebtController } from './debts.controller';
import { DebtorModule } from '../debtor/debtor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebtEntity]),
    DebtsImagesModule,
    DebtorModule,
  ],
  controllers: [DebtController],
  providers: [DebtsService],
  exports: [DebtsService],
})
export class DebtsModule {}
