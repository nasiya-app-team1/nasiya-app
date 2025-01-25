import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { Public } from 'src/common/decorator/jwt-public.decorator';

@ApiTags('Debts')
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Public()
  @Post('create')
  @ApiOperation({ summary: 'Create a new debt' })
  @ApiResponse({
    status: 201,
    description: 'The debt has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  async create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtsService.createDebt(createDebtDto);
  }

  @Public()
  @Get('all')
  @ApiOperation({ summary: 'Retrieve all debts' })
  @ApiResponse({ status: 200, description: 'List of all debts.' })
  async findAll() {
    return this.debtsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific debt by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debt to retrieve',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'The debt details.' })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  async findOne(@Param('id') id: string) {
    return this.debtsService.findOneDebtById(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific debt by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debt to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The debt has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  async update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.updateDebt(id, updateDebtDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific debt by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debt to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The debt has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Debt not found.' })
  remove(@Param('id') id: string) {
    return this.debtsService.deleteDebtById(id);
  }
}
