import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { CreateLikeDto, UpdateLikeDto } from './dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: 'Create a new Like' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like created successfully.',
    schema: {
      example: {
        status_code: 201,
        message: 'Like created successfully.',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @ApiResponse({  
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    schema: {
      example: {
        status_code: 403,
        message: 'Forbidden',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Not found',
        data: {},
      },
    },  
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',  
    schema: {
      example: {
        status_code: 409,
        message: 'Conflict',
        data: {},
      },
    },
  })
  @Post()
  async createLike(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.createLike(createLikeDto);
  }

  @ApiOperation({ summary: 'Retrieve all likes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all likes',
    schema: {
    example: {
        status_code: 200,
        message: 'Like of all likes',
        data: [
          {
            store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
            debtor_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    schema: {
      example: {
        status_code: 403,
        message: 'Forbidden',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Not found',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    schema: {
      example: {
        status_code: 500,
        message: 'Internal server error',
        data: {},
      },
    },
  })
  @Get()
  async getAllLikes() {
    return this.likesService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a likes by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the likes',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of the likes.',
    schema: {
      example: {
        status_code: 200,
        message: 'success',
        data: {
          store_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
          debtor_id: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    schema: {
      example: {
        status_code: 403,
        message: 'Forbidden',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Not found',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    schema: {
      example: {
        status_code: 500,
        message: 'Internal server error',
        data: {},
      },
    },
  })
  @Get(':id')
  async getLikeById(@Param('id') id: string) {
    return this.likesService.findOneLikeById(id);
  }

  @ApiOperation({ summary: 'Update a like by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the like',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like updated successfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'Like updated successfully.',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    schema: {
      example: {
        status_code: 403,
        message: 'Forbidden',
        data: {},
      },
    },
  })
  @ApiResponse({  
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Not found',
        data: {},
      },
    },  
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error', 
    schema: {
      example: {
        status_code: 500,
        message: 'Internal server error',
        data: {},
      },
    },
  })
  @Patch(':id')
  async updateLike(
    @Param('id') id: string,
    @Body() updateLikeDto: UpdateLikeDto,
  ) {
    return this.likesService.updateLike(id, updateLikeDto);
  }

  @ApiOperation({ summary: 'Delete a like by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the like',
    type: String,
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like deleted successfully.',
    schema: {
      example: {
        status_code: 200,
        message: 'Like deleted successfully.',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    schema: {
      example: {
        status_code: 400,
        message: 'Bad Request',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    schema: {
      example: {
        status_code: 403,
        message: 'Forbidden',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Not found',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    schema: {
      example: {
        status_code: 500,
        message: 'Internal server error',
        data: {},
      },
    },
  })
  @Delete(':id')
  async deleteLike(@Param('id') id: string) {
    return this.likesService.deleteLikeById(id);
  }
}
