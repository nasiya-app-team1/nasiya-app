import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { UpdateDebtorDto } from './dto/update-debtor.dto';
import { DebtorService } from './debtor.service';
import { Public } from 'src/common/decorator/jwt-public.decorator';

@Public()
@Controller('debtor')
export class DebtorController {
  constructor(private readonly debtorService: DebtorService) {}

  @Post('create')
  async create(@Body() createDebtorDto: CreateDebtorDto) {
    return this.debtorService.create(createDebtorDto);
  }

  @Get('all')
  async findAll() {
    return this.debtorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.debtorService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDebtorDto: Partial<UpdateDebtorDto>,
  ) {
    return this.debtorService.update(id, updateDebtorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.debtorService.delete(id);
  }
}
