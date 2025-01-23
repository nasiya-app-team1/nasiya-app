import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/core/entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ){}
  async create(CreatePaymentDto:CreatePaymentDto) {
    const payment=await this.paymentRepository.create(CreatePaymentDto)
    await this.paymentRepository.save(payment)
    return "Payment Muvaffaqiyatli Yaratildi"
  }

  async findAll() {
    const result = await this.paymentRepository.find();
    if (result.length) return result;
    return `Paymentlar topilmadi`;
  }

  async findOne(id: string) {
    const result = await this.paymentRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    return 'Payment topilmadi';
  }

  async update(id: string, UpdatePaymentDto: UpdatePaymentDto) {
    const result = await this.paymentRepository.findOne({ where: { id } });
    if (result) {
      await this.paymentRepository.update(id, UpdatePaymentDto);
      return 'Payment yangilandi';
    }
    return `Yangilanadigan Payment topilmadi`;
  }

  async remove(id: string) {
    const result = await this.paymentRepository.findOne({ where: { id } });
    if (result) {
      await this.paymentRepository.delete(id);
      return "Payment o'chirildi";
    }
    return `O'chiriladigan Payment topilmadi`;
  }
}
