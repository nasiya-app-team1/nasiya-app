import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentEntity } from 'src/core/entity/payment.entity';
import { BaseService } from 'src/infrastructure';
import { PaymentRepository } from 'src/core';

@Injectable()
export class PaymentService extends BaseService<
  CreatePaymentDto,
  DeepPartial<PaymentEntity>
> {
  constructor(@InjectRepository(PaymentEntity) repository: PaymentRepository) {
    super(repository);
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {

    const debt = await this.getRepository.findOne({where:{
      id:createPaymentDto.debt_id
   } });                                                                                                                                
    
    if (!debt) {  
      throw new BadRequestException('Relation debt not found');
    }
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
      this.getRepository.findOneBy({ id }),
      dto.debt_id
        ? this.getRepository.findOneBy({ id: dto.debt_id })
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
