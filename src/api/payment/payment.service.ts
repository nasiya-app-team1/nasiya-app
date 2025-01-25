import { HttpException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/core/entity/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}
  async create(CreatePaymentDto: CreatePaymentDto) {
    console.log(CreatePaymentDto)
    const payment = await this.paymentRepository.create(CreatePaymentDto);
    await this.paymentRepository.save(payment);
    return 'PaymentEntity Muvaffaqiyatli Yaratildi';
  }

  async findAll() {
    const result = await this.paymentRepository.find();
    if (result.length) return result;
    throw new HttpException('Paymentlar topilmadi', 404)  
  
  }

  async findOne(id: string) {
    const result = await this.paymentRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    throw new HttpException('Payment topilmadi', 404)  }

  async update(id: string, UpdatePaymentDto: UpdatePaymentDto) {
    const result = await this.paymentRepository.findOne({ where: { id } });
    if (result) {
      await this.paymentRepository.update(id, UpdatePaymentDto);
      return 'PaymentEntity yangilandi';
    }
    throw new HttpException('Yangilanadigan Payment topilmadi', 404)  }

  async remove(id: string) {
    const result = await this.paymentRepository.findOne({ where: { id } });
    if (result) {
      await this.paymentRepository.delete(id);
      return "PaymentEntity o'chirildi";
    }
    throw new HttpException("O'chiriladigan Payment topilmadi", 404);
  }
}
