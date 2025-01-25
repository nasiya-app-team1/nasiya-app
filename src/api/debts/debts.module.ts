import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { DebtEntity } from 'src/core/entity/debt.entity';
import { DebtsImagesModule } from '../debts-images/debts-images.module';

@Module({
  imports: [TypeOrmModule.forFeature([DebtEntity]), DebtsImagesModule],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [DebtsService],
})
export class DebtsModule {}
