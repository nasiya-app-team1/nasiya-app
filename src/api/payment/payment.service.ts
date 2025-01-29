import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentEntity } from 'src/core/entity/payment.entity';
import { BaseService } from 'src/infrastructure';
import { DebtEntity, DebtsRepository, PaymentRepository } from 'src/core';

@Injectable()
export class PaymentService extends BaseService<
  CreatePaymentDto,
  DeepPartial<PaymentEntity>
> {
  constructor(
    @InjectRepository(PaymentEntity) repository: PaymentRepository,
    @InjectRepository(DebtEntity) private debtsRepository: DebtsRepository,
  ) {
    super(repository);
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const debt = await this.debtsRepository.findOneBy({
      id: createPaymentDto.debt_id,
    });
    if (!debt) {
      throw new BadRequestException('Relation debt not found');
    }
    const date = new Date(debt.debt_date);
    date.setMonth(date.getMonth() + 1);
    const newDate = date.toISOString().split('T')[0];
    let month: number;
    if (createPaymentDto.type == 'one_month') {
      month = 1;
    } else if (createPaymentDto.type == 'multi_month') {
      const moneyForMonth = debt.debt_sum / debt.debt_period;
      month = Math.floor(createPaymentDto.sum / moneyForMonth);
    } else {
      month = 1;
    }
    const newDebt = {
      updated_at: new Date(Date.now()),
      debt_date: newDate,
      debt_sum: debt.debt_sum - createPaymentDto.sum,
      debt_period: debt.debt_period - month,
    };

    await this.debtsRepository.update(debt.id, newDebt);
    return await this.create(createPaymentDto);
  }

  async findOnePayment(id: string) {
    const result = await this.getRepository.findOne({ where: { id } });
    if (!result) {
      throw new BadRequestException('Payment not found');
    }
    return await this.findOneById(id);
  }

  async updatePayment(id: string, dto: UpdatePaymentDto) {
    const [payment, debt] = await Promise.all([
      this.findOneById(id),
      dto.debt_id
        ? this.debtsRepository.findOneBy({ id: dto.debt_id })
        : Promise.resolve(null),
    ]);

    if (!payment) {
      throw new BadRequestException('Payment not found');
    }
    if (!debt) {
      throw new BadRequestException('Relation debt not found');
    }
    return await this.update(id, dto);
  }

  async removePayemnt(id: string) {
    const payment = await this.getRepository.findOneBy({ id });
    if (!payment) {
      throw new BadRequestException('Payment not found');
    }
    return await this.delete(id);
  }
}
