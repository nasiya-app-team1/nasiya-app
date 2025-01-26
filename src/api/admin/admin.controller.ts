import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshDto } from './dto/refresh_token-admin.dto';
import { Public, RoleAdmin } from 'src/common/index.common';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({
    summary: 'Create super admin',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin  created',
    schema: {
      example: {
        status_code: 201,
        message: 'Admin created',
        data: {
          id: 'de40ee6e-2770-4d17-96fe-a11ce9a1d457',
          role: 'superadmin',
          created_at: '2025-01-26',
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
          usernameConflict: {
            summary: 'Username conflict',
            value: {
              message: 'Username already exists',
              error: 'Conflict',
              statusCode: 409,
            },
          },
          phoneNumberConflict: {
            summary: 'Phone number conflict',
            value: {
              message: 'Phone number already exists',
              error: 'Conflict',
              statusCode: 409,
            },
          },

          emailConflict: {
            summary: 'Email address conflict',
            value: {
              message: 'Email address already exists',
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          Forbidden: {
            summary: 'Forbidden',
            value: {
              message: 'Forbidden user',
              statusCode: 403,
            },
          },
        },
      },
    },
  })
  @Public()
  @Post('super-admin')
  createSuperAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto, RoleAdmin.SUPERADMIN);
  }

  @ApiOperation({
    summary: 'Create admin',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin  created',
    schema: {
      example: {
        status_code: 201,
        message: 'Admin created',
        data: {
          id: 'de40ee6e-2770-4d17-96fe-a11ce9a1d457',
          role: 'superadmin',
          created_at: '2025-01-26',
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
          usernameConflict: {
            summary: 'Username conflict',
            value: {
              message: 'Username already exists',
              error: 'Conflict',
              statusCode: 409,
            },
          },
          phoneNumberConflict: {
            summary: 'Phone number conflict',
            value: {
              message: 'Phone number already exists',
              error: 'Conflict',
              statusCode: 409,
            },
          },

          emailConflict: {
            summary: 'Email address conflict',
            value: {
              message: 'Email address already exists',
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          Forbidden: {
            summary: 'Forbidden',
            value: {
              message: 'Forbidden user',
              statusCode: 403,
            },
          },
        },
      },
    },
  })
  @Public()
  @Post('admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto, RoleAdmin.ADMIN);
  }

  @ApiOperation({
    summary: 'Login admin',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Log in',
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
          invalidCredentionals: {
            summary: 'Invalid Credentionals',
            value: {
              message: 'Username or password invalid',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @Public()
  @Post('login')
  login(
    @Body() loginDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginDto, res);
  }

  @ApiOperation({
    summary: 'Refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token refresh',
    schema: {
      example: {
        status_code: 200,
        message: 'Token refreshed',
        data: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid refresh token',
    schema: {
      example: {
        message: 'Invalid or expired token',
        error: 'Unauthorized',
        statusCode: 401,
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
  @Post('refresh-token')
  updateToken(@Body() refreshDto: RefreshDto) {
    return this.adminService.refreshToken(refreshDto);
  }

  @ApiOperation({
    summary: 'Logout admin',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin logged out',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid refresh token',
    schema: {
      example: {
        message: 'Invalid or expired token',
        error: 'Unauthorized',
        statusCode: 401,
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
  @Post('logout')
  logout(
    @Body() refreshDto: RefreshDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshDto, res);
  }

  @ApiOperation({
    summary: 'Get admin by id',
  })
  @ApiParam({ name: 'id', description: 'The ID of the admin', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one admin',
    schema: {
      example: {
        status_code: 200,
        message: 'Success',
        data: {
          id: 'b262531c-808e-405a-a2ef-66714fa7e01d',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
          username: 'user1',
          phone_number: '+998908717388',
          email: 'user1@gmail.com',
          role: 'superadmin',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
    schema: {
      example: {
        message: 'Admin not found',
        error: 'Bad Request',
        statusCode: 400,
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
    return this.adminService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update admin',
  })
  @ApiParam({ name: 'id', description: 'The ID of the admin', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin updated',
    schema: {
      example: {
        status_code: 200,
        message: 'Updated',
        data: {
          id: '53fa6809-d804-483a-b244-045396379d06',
          created_at: '2025-01-26',
          updated_at: '2025-01-26',
          username: 'abdulaziz',
          phone_number: '+998908717304',
          email: null,
          role: 'superadmin',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
    schema: {
      example: {
        message: 'Admin not found',
        error: 'Bad Request',
        statusCode: 400,
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
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({
    summary: 'Delete admin',
  })
  @ApiParam({ name: 'id', description: 'The ID of the admin', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin deleted',
    schema: {
      example: {
        status_code: 200,
        message: 'Deleted',
        data: {
          id: '53fa6809-d804-483a-b244-045396379d06',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
    schema: {
      example: {
        message: 'Admin not found',
        error: 'Bad Request',
        statusCode: 400,
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
    return this.adminService.remove(id);
  }
}
