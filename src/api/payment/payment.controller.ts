import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  Query,
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
    schema: {
      example: {
        status_code: 201,
        message: 'Payment Created Succesfully',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        message: 'Bad Request',
        statusCode: 201,
      },
    },
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get all payment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get with pagination',
    schema: {
      example: {
        data: [
          {
            id: 'f959aed9-0735-4ddb-a42d-963632a65a71',
            created_at: '2025-01-29',
            updated_at: '2025-01-29',
            date: '2024-03-12',
            sum: '150000.00',
            debt_id: '2013583b-e197-45b6-978f-338f85c7d7c9',
            type: 'one_month',
          },
        ],
        total_elements: 14,
        total_pages: 14,
        page_size: '1',
        current_page: '1',
        from: 1,
        to: 1,
        status_code: 200,
        message: 'Success',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          unauthorized: {
            summary: 'Unauthorized',
            value: {
              message: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
    },
  })
  @Get('pagination')
  async findAllWithPagination(@Query() query: any) {
    const option = {
      take: query.take,
      skip: query.skip,
    };
    return this.paymentService.findAllWithPagination(option);
  }

  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the payments',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of the payment.',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          debt_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input .',
    schema: {
      example: {
        message: 'Bad Request',
        statusCode: 201,
      },
    },
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
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment updated succesfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'Payment updated successfully.',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        message: 'Bad Request',
        statusCode: 201,
      },
    },
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the payment to delete',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "PaymentEntity o'chirildi.",
    schema: {
      example: {
        status_code: 200,
        message: 'Payment deleted successfully.',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "O'chiriladigan Payment topilmadi",
    schema: {
      example: {
        message: 'Bad Request',
        statusCode: 201,
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.removePayemnt(id);
  }
}
