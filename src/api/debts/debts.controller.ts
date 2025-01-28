import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { Public } from 'src/common/decorator/jwt-public.decorator';
import { DebtsService } from './debts.service';

@ApiTags('Debts')
@Public()
@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtsService) {}

  @ApiOperation({ summary: 'Create a new debt' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Debt created',
    schema: {
      example: {
        status_code: 201,
        message: 'Created',
        data: {
          debt_date: '2025-01-26',
          debtor_id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          debt_period: 'MONTHLY',
          debt_sum: 500.75,
          description: 'Utility bill',
          id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
    content: {
      'application/json': {
        examples: {
          invalidData: {
            summary: 'Invalid data',
            value: {
              message: 'Invalid input data',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notFound: {
            summary: ' Not Found',
            value: {
              message: 'Debtor not Found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
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
  @Post('create')
  async create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtService.createDebt(createDebtDto);
  }

  @ApiOperation({ summary: 'Get all debt' })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get with pagination',
    schema: {
      example: {
        data: [
          {
            id: '03b5cc1b-af21-46ea-b2fc-b43a489ffab7',
            created_at: '2025-01-27',
            updated_at: '2025-01-27',
            debt_date: '2025-01-27T09:07:07.502Z',
            debtor_id: '78fb3a41-5ec5-4587-9818-11cb6a2cd9bc',
            debt_period: '1 oy',
            debt_sum: '12121.12',
            description: 'sdkfsnfskanfasnfaskjdfsd',
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
  @Get('pagination')
  async findAll(@Query() query: any) {
    const option = {
      take: query.take,
      skip: query.skip,
    };
    return this.debtService.findAllWithPagination(option);
  }

  @ApiOperation({ summary: 'Get a debt by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the debt', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one debt',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: {
          id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
          debt_date: '2025-01-26',
          debtor_id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          debt_period: 'MONTHLY',
          debt_sum: 500.75,
          description: 'Utility bill',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid debt ID',
    content: {
      'application/json': {
        examples: {
          invalidID: {
            summary: 'Invalid debt ID',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notFound: {
            summary: ' Not Found',
            value: {
              message: 'Debt not Found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.debtService.findOneDebtById(id);
  }

  @ApiOperation({ summary: 'Update a debt by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debt to update',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Debt updated',
    schema: {
      example: {
        status_code: 200,
        message: 'Updated',
        data: {
          id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
          debt_date: '2025-01-26',
          debtor_id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          debt_period: '1 oy',
          debt_sum: 600.0,
          description: 'Updated',
          created_at: '2025-01-26',
          updated_at: '2025-01-27',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid debt ID',
    content: {
      'application/json': {
        examples: {
          invalidID: {
            summary: 'Invalid debt ID',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'debtor id not found',
            value: {
              message: 'Debt not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtService.updateDebt(id, updateDebtDto);
  }

  @ApiOperation({ summary: 'Delete a debt by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debt to delete',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Debt deleted',
    schema: {
      example: {
        status_code: 200,
        message: 'Deleted',
        data: {
          id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid debt ID',
    content: {
      'application/json': {
        examples: {
          invalidID: {
            summary: 'Invalid debt ID',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notFound: {
            summary: ' Not Found',
            value: {
              message: 'Debtor not Found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
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
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.debtService.deleteDebtById(id);
  }
}
