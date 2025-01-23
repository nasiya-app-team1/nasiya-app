import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtEntity } from 'src/core/entities/debt.entity';
import { DebtorEntity } from 'src/core/entities/debtor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtEntity, DebtorEntity])],
  controllers: [DebtsController],
  providers: [DebtsService],
})
export class DebtsModule {}
