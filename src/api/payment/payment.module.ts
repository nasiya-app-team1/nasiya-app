import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from 'src/core/entity/payment.entity';
import { DebtsModule } from '../debts/debts.module';
import { DebtsService } from '../debts/debts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity]), DebtsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
