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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('debts-images')
@Controller('debts-images')
export class DebtsImagesController {
  constructor(private readonly debtsImagesService: DebtsImagesService) {}

  @ApiOperation({
    summary: 'Create a new debts image',
  })
  @ApiResponse({
    status: 201,
    description: 'The debts image has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @Post()
  create(@Body() createDebtsImageDto: CreateDebtsImageDto) {
    return this.debtsImagesService.create(createDebtsImageDto);
  }

  @ApiOperation({
    summary: 'Get all debts images',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all debts images.',
  })
  @Get()
  findAll() {
    return this.debtsImagesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a debts image by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the debts image by id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debts image not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtsImagesService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a debts image by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The debts image has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debts image not found.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDebtsImageDto: UpdateDebtsImageDto,
  ) {
    return this.debtsImagesService.update(id, updateDebtsImageDto);
  }

  @ApiOperation({
    summary: 'Delete a debts image by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The debts image has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debts image not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtsImagesService.delete(id);
  }
}
