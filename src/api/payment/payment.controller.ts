import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
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
    status: HttpStatus.CREATED,
    description: 'PaymentEntity Created Succesfully',
    schema:{
      example:{
        status_code:201,
        message:'Payment Created Succesfully',
        data:{}
      }
    }
  })
  @ApiResponse({ 
   status: HttpStatus.BAD_REQUEST ,
   description: 'Invalid input.' ,
   schema : {
    example:{
      status_code:201,
      message:'Bad Request',
      data:{}
    }
   } 
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @ApiOperation({ summary: 'Retrieve all Payments' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all Payments.',
  schema:{
    example:{
      status_code:200,
      message:'Payment off all debtors',
      data:{
        debt_id:'e2f48432-0de3-4a0f-b1f6-42bbace74a14'
      }
    }
  }
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.',
 schema:{
  example:{
    status_code:400,
    message:'Bad Request',
    data:{}
  }
} })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payments', type: String ,example:'e2f48432-0de3-4a0f-b1f6-42bbace74a14'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Details of the payment.', 
  schema:{
    example:{
      status_code:200,
      message:'success',
      data:{
        debt_id:'e2f48432-0de3-4a0f-b1f6-42bbace74a14'
      }
    }
  }
  
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input .',
  schema:{
    example:{
      status_code:400,
      message:'Bad Request'
    }
  }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOnePayment(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the payment to update',
    type: String,
    example:'e2f48432-0de3-4a0f-b1f6-42bbace74a14'
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Payment updated succesfully.',
    schema:{
      example:{
        status_code: 200,
        message: 'Payment updated successfully.',
        data: {},
      }
    }
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.',
  schema:{
    example:{
      status_code: 400,
        message: 'Bad Request',
        data: {},
    }
  }

  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the payment to delete',
    type: String,
    example:'e2f48432-0de3-4a0f-b1f6-42bbace74a14'
  })
  @ApiResponse({ status: HttpStatus.OK, description: "PaymentEntity o'chirildi." ,schema:{
    example:{
      status_code: 200,
        message: 'Payment deleted successfully.',
        data: {},
    }
  }})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "O'chiriladigan Payment topilmadi",schema:{
    example:{
      status_code: 400,
      message: 'Bad Request',
      data: {},
    }
  } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.removePayemnt(id);
  }
}
