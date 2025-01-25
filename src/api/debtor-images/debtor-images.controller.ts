import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { DebtorImagesService } from './debtor-images.service';
import { CreateDebtorImageDto } from './dto/create-debtor-image.dto';
import { UpdateDebtorImageDto } from './dto/update-debtor-image.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/infrastructure';

@ApiTags('debtor-images')
@Controller('debtor-images')
export class DebtorImagesController {
  constructor(private readonly debtorImagesService: DebtorImagesService) {}

  @ApiOperation({
    summary: 'Create a new debtor image',
  })
  @ApiResponse({
    status: 201,
    description: 'The debtor image has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @Post('save')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ImageValidationPipe)
  async uploadFileAndCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDebtorImageDto: CreateDebtorImageDto,
  ) {
    return await this.debtorImagesService.createImage(
      createDebtorImageDto,
      file,
    );
  }

  @ApiOperation({
    summary: 'Get all debtor images',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all debtor images',
  })
  @Get()
  findAll() {
    return this.debtorImagesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a debtor image by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the debtor image by id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debtor image not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtorImagesService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a debtor image by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The debtor image has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debtor image not found.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDebtorImageDto: UpdateDebtorImageDto,
  ) {
    return this.debtorImagesService.update(id, updateDebtorImageDto);
  }

  @ApiOperation({
    summary: 'Delete a debtor image by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The debtor image has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Debtor image not found.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtorImagesService.delete(id);
  }
}
