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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from 'src/common/decorator/jwt-public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Super admin created',
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
    description: 'Failed creating user',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on creating super admin',
      },
    },
  })
  @Public()
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User logged in ',
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
    description: 'Failed login',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on logging in',
      },
    },
  })
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.usersService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Find all users',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'All users',
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
    description: 'Failed on getting all users',
    schema: {
      example: {
        status_code: 400,
        message: 'Failed on getting all users',
      },
    },
  })
  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Find one user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Get one user',
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
    description: 'Failed getting one user',
    schema: {
      example: {
        status_code: 400,
        message: 'Failed getting one user',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User updated',
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
    description: 'Failed updating user',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on updating user',
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Deleted user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User deleted',
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
    description: 'Failed deleting user',
    schema: {
      example: {
        status_code: 400,
        message: 'Error on deleting user',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
