import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DebtorImagesService } from './debtor-images.service';
import { CreateDebtorImageDto } from './dto/create-debtor-image.dto';
import { UpdateDebtorImageDto } from './dto/update-debtor-image.dto';

@Controller('debtor-images')
export class DebtorImagesController {
  constructor(private readonly debtorImagesService: DebtorImagesService) {}

  @Post()
  create(@Body() createDebtorImageDto: CreateDebtorImageDto) {
    return this.debtorImagesService.create(createDebtorImageDto);
  }

  @Get()
  findAll() {
    return this.debtorImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtorImagesService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDebtorImageDto: UpdateDebtorImageDto,
  ) {
    return this.debtorImagesService.update(id, updateDebtorImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtorImagesService.delete(id);
  }
}
