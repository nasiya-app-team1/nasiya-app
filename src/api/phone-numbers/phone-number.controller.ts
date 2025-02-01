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
import { PhoneNumbersService } from './phone-numbers.service';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private readonly phoneNumbersService: PhoneNumbersService) {}
  @ApiOperation({
    summary: 'Create a debtor numbers',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Phone number created',
    schema: {
      example: {
        status_code: 201,
        message: 'Created',
        data: [
          {
            phone_number: '+998917717744',
            debtor_id: 'ce9858a1-2c87-49b7-aee5-2c890382250c',
            id: '13c84a84-f2d0-4a03-8a4c-37180c3eba5e',
            created_at: '2025-01-27',
            updated_at: '2025-01-27',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
    content: {
      'application/json': {
        examples: {
          invalidDebtorId: {
            summary: 'Invalid debtor id',
            value: {
              message: ['debtor_id must be a UUID'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'Invalid debtor id',
            value: {
              message: 'Debtor with the given ID not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict errors',
    content: {
      'application/json': {
        examples: {
          conflict: {
            summary: 'Conflict numbers',
            value: {
              message: 'The following phone numbers already exist',
              error: 'Conflict',
              statusCode: 409,
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
  create(@Body() createPhoneNumberDto: CreatePhoneNumberDto) {
    return this.phoneNumbersService.createNumbers(createPhoneNumberDto);
  }

  @ApiOperation({
    summary: 'Get debtor numbers',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of debtor',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get on debtors numbers',
    schema: {
      example: {
        status_code: 201,
        message: 'sucess',
        data: [
          {
            id: '1c2ac85d-b043-425e-a091-0c806a320e84',
            created_at: '2025-01-27',
            updated_at: '2025-01-27',
            phone_number: '+998901234567',
            debtor_id: 'ce9858a1-2c87-49b7-aee5-2c890382250c',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
    content: {
      'application/json': {
        examples: {
          invalidDebtorId: {
            summary: 'Invalid debtor id',
            value: {
              message: ['debtor_id must be a UUID'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          notfound: {
            summary: 'Invalid debtor id',
            value: {
              message: 'Debtor with the given ID not found',
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
  @Get('debtor/:id')
  findUserNumbers(@Param('id') id: string) {
    return this.phoneNumbersService.findOneByUserId(id);
  }

  @ApiOperation({
    summary: 'Get one number',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of number',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one number',
    schema: {
      example: {
        status_code: 200,
        message: 'sucess',
        data: [
          {
            id: '1c2ac85d-b043-425e-a091-0c806a320e84',
            created_at: '2025-01-27',
            updated_at: '2025-01-27',
            phone_number: '+998901234567',
            debtor_id: 'ce9858a1-2c87-49b7-aee5-2c890382250c',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
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
            summary: 'Invalid number id',
            value: {
              message: 'Phone number not found',
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
  findOne(@Param('id') id: string) {
    return this.phoneNumbersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get one number',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of number',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one number',
    schema: {
      example: {
        status_code: 200,
        message: 'sucess',
        data: [
          {
            id: '1c2ac85d-b043-425e-a091-0c806a320e84',
            created_at: '2025-01-27',
            updated_at: '2025-01-27',
            phone_number: '+998901234567',
            debtor_id: 'ce9858a1-2c87-49b7-aee5-2c890382250c',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
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
            summary: 'Invalid number id',
            value: {
              message: 'Phone number not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          relatedNotFound: {
            summary: 'Related debtor not found',
            value: {
              message: 'Related debtor not found',
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
  update(
    @Param('id') id: string,
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto,
  ) {
    return this.phoneNumbersService.updateNumber(id, updatePhoneNumberDto);
  }

  @ApiOperation({
    summary: 'Delete number',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of number',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete number',
    schema: {
      example: {
        status_code: 200,
        message: 'Deleted',
        data: {
          id: '1c2ac85d-b043-425e-a091-0c806a320e84',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
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
            summary: 'Invalid number id',
            value: {
              message: 'Phone number not found',
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
  remove(@Param('id') id: string) {
    return this.phoneNumbersService.deleteNumberById(id);
  }
}
