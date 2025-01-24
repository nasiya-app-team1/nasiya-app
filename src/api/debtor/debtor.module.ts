import { Module } from '@nestjs/common';
import { DebtorService } from './debtor.service';
import { DebtorController } from './debtor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorEntity } from 'src/core/entity/debtor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtorEntity])],
  controllers: [DebtorController],
  providers: [DebtorService],
})
export class DebtorModule {}
