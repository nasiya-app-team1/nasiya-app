import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from 'src/common/decorator';

@ApiTags('Payment')
@Public()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new Payment' })
  @ApiResponse({
    status: 201,
    description: 'PaymentEntity Muvaffaqiyatli Yaratildi',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPaymetn(createPaymentDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all Payments' })
  @ApiResponse({ status: 200, description: 'List of all Payments.' })
  @ApiResponse({ status: 404, description: 'Paymentlar topilmadi.' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment', type: String })
  @ApiResponse({ status: 200, description: 'Details of the payment.' })
  @ApiResponse({ status: 404, description: 'Payment topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOnePayment(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the payment to update',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'PaymentEntity yangilandi.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({
    status: 404,
    description: 'Yangilanadigan Payment topilmadi.',
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the payment to delete',
    type: String,
  })
  @ApiResponse({ status: 200, description: "PaymentEntity o'chirildi." })
  @ApiResponse({ status: 404, description: "O'chiriladigan Payment topilmadi" })
  remove(@Param('id') id: string) {
    return this.paymentService.removePayemnt(id);
  }
}
