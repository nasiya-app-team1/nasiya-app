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
  @ApiResponse({ status: 201, description: 'Debtor created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post('create')
  async create(@Body() createDebtorDto: CreateDebtorDto) {
    return this.debtorService.createDebtor(createDebtorDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all debtors' })
  @ApiResponse({ status: 200, description: 'List of all debtors.' })
  async findAll() {
    return this.debtorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a debtor by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the debtor', type: String })
  @ApiResponse({ status: 200, description: 'Details of the debtor.' })
  @ApiResponse({ status: 404, description: 'Debtor not found.' })
  async findOne(@Param('id') id: string) {
    return this.debtorService.findOneDebtor(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a debtor by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debtor to update',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Debtor updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Debtor not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateDebtorDto: Partial<UpdateDebtorDto>,
  ) {
    return this.debtorService.updateDebtor(id, updateDebtorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a debtor by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debtor to delete',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Debtor deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Debtor not found.' })
  async delete(@Param('id') id: string) {
    return this.debtorService.deleteDebtor(id);
  }
}
