import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DebtsImagesService } from './debts-images.service';
import { CreateDebtsImageDto } from './dto/create-debts-image.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/infrastructure';

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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ImageValidationPipe)
  create(
    @Body() createDebtsImageDto: CreateDebtsImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.debtsImagesService.createImage(createDebtsImageDto, file);
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
