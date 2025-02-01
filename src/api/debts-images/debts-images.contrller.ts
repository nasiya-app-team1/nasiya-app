import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DebtsImagesService } from './debts-images.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/infrastructure';

@ApiTags('debts-images')
@Controller('debts-images')
export class DebtsImagesController {
  constructor(private readonly debtsImagesService: DebtsImagesService) {}

  @ApiOperation({
    summary: 'Create a new debt image',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of debt',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upload image for debt',
    schema: {
      example: {
        status_code: 201,
        message: 'Success',
        data: {
          image: 'f4a53e3f-600d-48cb-b655-b0926dd01ad9.png',
          debt_id: 'ce9858a1-2c87-49b7-aee5-2c890382250c',
          id: 'a825de27-bfed-4207-9de1-9124d7e90630',
          created_at: '2025-01-27',
          updated_at: '2025-01-27',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request errors',
    content: {
      'application/json': {
        examples: {
          invalidUUID: {
            summary: 'Invalid id',
            value: {
              message: 'Invalid UUID format for id',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidImagePath: {
            summary: 'Invalid image path',
            value: {
              message: 'Invalid path: ./path.img',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          unauthorized: {
            summary: 'Unauthorized',
            value: {
              message: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ImageValidationPipe)
  create(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    return this.debtsImagesService.createImage(file, id);
  }

  @ApiOperation({
    summary: 'Delete a debt image by id',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of debt',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upload image for debt',
    schema: {
      example: {
        status_code: 200,
        message: 'Deleted',
        data: {
          id: 'a825de27-bfed-4207-9de1-9124d7e90630',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          unauthorized: {
            summary: 'Unauthorized',
            value: {
              message: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtsImagesService.delete(id);
  }
}
