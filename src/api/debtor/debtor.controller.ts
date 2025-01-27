import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { UpdateDebtorDto } from './dto/update-debtor.dto';
import { DebtorService } from './debtor.service';
import { Public } from 'src/common/decorator/jwt-public.decorator';

@ApiTags('Debtors')
@Public()
@Controller('debtor')
export class DebtorController {
  constructor(private readonly debtorService: DebtorService) {}

  @ApiOperation({ summary: 'Create a new debtor' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Store created',
    schema: {
      example: {
        status_code: 201,
        message: 'Created',
        data: {
          full_name: 'Abdulaziz',
          address: 'hello ',
          description: 'test just',
          store_id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Store not found',
    content: {
      'application/json': {
        examples: {
          invalidImagePath: {
            summary: 'store not found',
            value: {
              message: 'Store not found',
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
  async create(@Body() createDebtorDto: CreateDebtorDto) {
    return this.debtorService.createDebtor(createDebtorDto);
  }

  @ApiOperation({ summary: 'Get all store debtors' })
  @ApiParam({ name: 'id', description: 'The ID of the Store', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get store all debtors',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: [
          {
            id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
            created_at: '2025-01-26',
            updated_at: '2025-01-26',
            full_name: 'Abdulaziz',
            address: 'hello ',
            description: 'test just',
            store_id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Store not found',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
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
  @Get('all/:id')
  async findAll(@Param() id: string) {
    return this.debtorService.findAllStoreDebtors(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a debtor by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the debtor', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one debtor',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: {
          id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
          full_name: 'Abdulaziz',
          address: 'hello ',
          description: 'test just',
          store_id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Store not found',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'not found',
            value: {
              message: 'Debtor not found',
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
  async findOne(@Param('id') id: string) {
    return this.debtorService.findOneDebtor(id);
  }

  @ApiOperation({ summary: 'Update a debtor by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debtor to update',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Debtor updated',
    schema: {
      example: {
        status_code: 200,
        message: 'Updated',
        data: {
          id: '4ae68292-ab80-42de-a499-0f34b9b3feed',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
          full_name: 'Abdulaziz',
          address: 'hello 2',
          description: 'test just',
          store_id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Store not found',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'not found',
            value: {
              message: 'Debtor not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          storenotfound: {
            summary: 'not found',
            value: {
              message: 'Store not found',
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
  async update(
    @Param('id') id: string,
    @Body() updateDebtorDto: UpdateDebtorDto,
  ) {
    return this.debtorService.updateDebtor(id, updateDebtorDto);
  }

  @ApiOperation({ summary: 'Delete a debtor by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debtor to delete',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Debtor updated',
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
    description: 'Store not found',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'not found',
            value: {
              message: 'Debtor not found',
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
    return this.debtorService.deleteDebtor(id);
  }
}
