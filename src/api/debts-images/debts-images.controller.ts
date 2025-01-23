import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DebtsImagesService } from './debts-images.service';
import { CreateDebtsImageDto } from './dto/create-debts-image.dto';
import { UpdateDebtsImageDto } from './dto/update-debts-image.dto';

@Controller('debts-images')
export class DebtsImagesController {
  constructor(private readonly debtsImagesService: DebtsImagesService) {}

  @Post()
  create(@Body() createDebtsImageDto: CreateDebtsImageDto) {
    return this.debtsImagesService.create(createDebtsImageDto);
  }

  @Get()
  findAll() {
    return this.debtsImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtsImagesService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDebtsImageDto: UpdateDebtsImageDto,
  ) {
    return this.debtsImagesService.update(id, updateDebtsImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtsImagesService.delete(id);
  }
}
