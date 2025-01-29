import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UsePipes,
  UploadedFile,
  HttpStatus,
  Request,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { LoginStoreDto } from './dto/login-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/infrastructure';
import { DeleteStoreImageDto } from './dto/delete-image.dto';
import { UserRequest } from 'src/common/guard/request';
import { Public } from 'src/common/decorator';
import { endOfMonth, startOfMonth } from 'date-fns';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({
    summary: 'Create a new store',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Store created',
    schema: {
      example: {
        status_code: 201,
        message: 'Created',
        data: {
          id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          created_at: '2025-01-26',
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
          invalidImagePath: {
            summary: 'Invalid image path',
            value: {
              message: 'Invalid path: ./path.img',
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
            summary: 'Conflict credentionals',
            value: {
              message: 'Store already exists',
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
  @Public()
  @Post('create')
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.createStore(createStoreDto);
  }

  @ApiOperation({
    summary: 'Login a store',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Store logged in',
    schema: {
      example: {
        status_code: 200,
        message: 'Logged in',
        data: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
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
          invalidLoginOrPassword: {
            summary: 'Invalid login or password',
            value: {
              message: 'Login or password not valid',
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
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginStoreDto) {
    return this.storesService.loginStore(loginDto);
  }

  @ApiOperation({
    summary: 'Get all stores',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Store logged in',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: [
          {
            id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
            created_at: '2025-01-26',
            updated_at: '2025-01-26',
            full_name: 'Abdulaziz',
            email: 'abdulaziz@gmail.com',
            login: 'abdulaziz',
            phone_number: '+998908717304',
            wallet: '15000.00',
            image: '/static/store/8501fd30-c68f-48ee-afd0-699b7e1a3a49.png',
            is_active: true,
          },
        ],
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
  @Get('all')
  findAll() {
    return this.storesService.findAllStores();
  }

  @ApiOperation({
    summary: "Retrieve a store's wallet by ID",
    description:
      'Returns the wallet information of a specific store based on its unique ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one store wallet',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        wallet: '15000.00',
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
  @Get('wallet')
  getWallet(@Request() req: UserRequest) {
    const id = req.user.id;
    return this.storesService.getWallet(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all debtors payment',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        total_amount: 12121.12,
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
  @Public()
  @Get('allpayment')
  getAllPayment() {
    return this.storesService.findAllPayment();
  }

  @ApiOperation({
    summary: 'Fetch the count of debtors linked to a store',
    description:
      'This endpoint returns the total number of debtors assigned to a specific store, identified by its unique ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one store debtorCount',
    schema: {
      example: {
        status_code: 200,
        storeId: '64efa2f4-665c-4dfe-984e-ea852c03dd10',
        storeName: 'Abdulaziz',
        debtorCount: 6,
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
              status_code: 401,
            },
          },
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
              status_code: 400,
            },
          },
          notfound: {
            summary: 'not found',
            value: {
              message: 'Store not found',
              error: 'Bad Request',
              status_code: 400,
            },
          },
        },
      },
    },
  })
  @Get('debtor-count')
  getDebtorCount(@Request() req: UserRequest) {
    const id = req.user.id;
    return this.storesService.getDebtorCount(id);
  }

  @ApiOperation({
    summary: 'will return the value of the entire loan for this month',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one store debtorCount',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        amount: 40,
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
              status_code: 401,
            },
          },
        },
      },
    },
  })
  @Get('monthly-debt')
  getMonthlyDebt(
    @Request() req: UserRequest,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const id = req.user.id;
    const start = startDate ? new Date(startDate) : startOfMonth(new Date());
    const end = endDate ? new Date(endDate) : endOfMonth(new Date());

    return this.storesService.getMonthlyDebt(id, start, end);
  }

  @ApiOperation({
    summary: 'will return the value of the entire loan for this day',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get total amount by day',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        amount: 20,
        debtors: {
          Abdulaziz: 20,
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
              status_code: 401,
            },
          },
        },
      },
    },
  })
  @Get('daily-debt')
  getDailyDebtAndDebtors(
    @Request() req: UserRequest,
    @Query('date') date?: Date,
  ) {
    const id = req.user.id;
    const curDate = String(new Date(Date.now())).split('T')[0];
    const time = date || curDate;

    return this.storesService.getDailyDebtAndDebtors(id, time);
  }

  @ApiOperation({
    summary: 'will return the value of the entire loan for this day',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get total amount by day',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        amount: 20,
        debtors: {
          Abdulaziz: 20,
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
              status_code: 401,
            },
          },
        },
      },
    },
  })
  @Get('late-payments')
  latePayments(@Request() req: UserRequest) {
    const id = req.user.id;
    return this.storesService.latePayments(id);
  }

  @ApiOperation({
    summary: 'Get a store by id',
  })
  @ApiParam({ name: 'id', description: 'The ID of the store', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one store',
    schema: {
      example: {
        status_code: 201,
        message: 'Created',
        data: {
          id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
          full_name: 'Abdulaziz',
          email: 'abdulaziz@gmail.com',
          login: 'abdulaziz',
          phone_number: '+998908717304',
          wallet: '15000.00',
          image: '/static/store/8501fd30-c68f-48ee-afd0-699b7e1a3a49.png',
          is_active: true,
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findStoreById(id);
  }

  @ApiOperation({
    summary: 'Update a store by id',
  })
  @ApiParam({ name: 'id', description: 'The ID of the store', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one store',
    schema: {
      example: {
        status_code: 200,
        message: 'Updated',
        data: {
          id: 'ab735ba5-f229-4c9f-8bd3-33ad11e221b9',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
          full_name: 'Abdulaziz',
          email: 'abdulaziz@gmail.com',
          login: 'abdulaziz',
          phone_number: '+998908717304',
          wallet: '15000.00',
          image: '/static/store/8501fd30-c68f-48ee-afd0-699b7e1a3a49.png',
          is_active: true,
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
            summary: 'not found',
            value: {
              message: 'Store not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidImagePath: {
            summary: 'Invalid image path',
            value: {
              message: 'Invalid path: ./path.img',
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
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.updateStore(id, updateStoreDto);
  }

  @ApiOperation({
    summary: 'Upload store image',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Image  created',
    schema: {
      example: {
        status_code: 201,
        message: 'Created',
        data: {
          path: '/static/store/697f43ce-bb35-4ccb-bc60-a2f22a7a1ba3.png',
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
          invalidExtensions: {
            summary: 'Invalid Extensions',
            value: {
              message:
                'Only image files (JPEG, JPG, PNG, SVG, HEIC) are allowed.',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidFile: {
            summary: 'Invalid fail',
            value: {
              message: 'No file uploaded or invalid file',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          uploadingError: {
            summary: 'Uploading failed',
            value: {
              status_code: 400,
              message: 'fail',
              data: { error: 'uploading error' },
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
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ImageValidationPipe)
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.storesService.upload(file);
  }

  @ApiOperation({
    summary: 'Delete store image',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Image deleted',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Image deleted',
            value: {
              status_code: 200,
              message: 'Deleted',
              data: {},
            },
          },
          fail: {
            summary: 'Image not deleted',
            value: {
              status_code: 200,
              message: 'fail',
              data: {
                error: {
                  message: 'File not found',
                  error: 'Bad Request',
                  statusCode: 400,
                },
              },
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
  @Delete('delete-image')
  async deleteImage(@Body() dto: DeleteStoreImageDto) {
    return await this.storesService.deleteImage(dto);
  }

  @ApiOperation({
    summary: 'Delete a store by id',
  })
  @ApiParam({ name: 'id', description: 'The ID of the store', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one store',
    schema: {
      example: {
        status_code: 200,
        message: 'Deleted',
        data: {
          id: '7cf7bfc9-d371-4876-a456-369cfc8b481e',
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.removeStore(id);
  }
}
