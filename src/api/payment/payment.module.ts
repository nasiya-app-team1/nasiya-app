import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from 'src/core/entity/payment.entity';
import { DebtEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, DebtEntity])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
