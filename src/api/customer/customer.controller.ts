import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/cutomer.dto';
import { UpdateCustomerDto } from './dto/cutomer.update.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  async create(@Body() customerDto: CustomerDto) {
    return this.customerService.create(customerDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Get('')
  async findAll() {
    return this.customerService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
