import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/core/entities/customer.entity';
import { CustomerRepository } from 'src/core/repositories/customer.repository';
import { CustomerDto } from './dto/cutomer.dto';
import { UpdateCustomerDto } from './dto/cutomer.update.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: CustomerRepository,
  ) {}
  async create(customerDto: CustomerDto): Promise<CustomerEntity> {
    const newCustomer = this.repository.create(customerDto);
    return this.repository.save(newCustomer);
  }

  async findOne(id: string): Promise<CustomerEntity> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<CustomerEntity[]> {
    return this.repository.find();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    await this.repository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
