import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { LoginStoreDto } from './dto/login-store.dto';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({
    summary: 'Create a new store',
  })
  @ApiResponse({
    status: 201,
    description: 'The store has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.createStore(createStoreDto);
  }

  @ApiOperation({
    summary: 'Login a store',
  })
  @ApiResponse({
    status: 200,
    description: 'The store has been successfully logged in.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @Post('login')
  login(@Body() loginDto: LoginStoreDto) {
    return this.storesService.loginStore(loginDto);
  }

  @ApiOperation({
    summary: 'Get all stores',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all stores.',
  })
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a store by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the store by id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a store by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The store has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found.',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.updateStore(id, updateStoreDto);
  }

  @ApiOperation({
    summary: 'Delete a store by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The store has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.removeStore(id);
  }
}
