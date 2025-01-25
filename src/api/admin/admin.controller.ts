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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    summary: 'Create super_admin',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Super admin  created',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed creating super admin',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on creating super admin',
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
    description: 'Admin created',
    schema: {
      example: {
        status_code: 201,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed creating admin',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on creating admin',
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
    description: 'Admin logged in',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
    schema: {
      example: {
        status_code: 401,
        message: 'Invalid credentials',
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
    description: 'Token refreshed',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
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
        status_code: 401,
        message: 'Invalid refresh token',
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
        status_code: 401,
        message: 'Invalid refresh token',
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          username: 'admin',
          email: 'admin@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Admin not found',
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin updated',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed updating admin',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on updating admin',
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin deleted',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Admin not found',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
