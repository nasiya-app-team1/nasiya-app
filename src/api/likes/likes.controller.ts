import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @ApiOperation({ summary: 'Create a new Like' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like created successfully.',
    schema: {
      example: {
        status_code: 201,
        message: "Created",
        data: {
          store_id: "64efa2f4-665c-4dfe-984e-ea852c03dd10",
          debtor_id: "1a55a3b3-46fc-46f1-8fed-e6b6f211213c",
          id: "a6915609-0580-422c-994b-a11e573cd698",
          created_at: "2025-01-27",
          updated_at: "2025-01-27"
        }
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
          invalidDebtor: {
            summary: 'Invalid debtor',
            value: {
              message: 'Related debtor not found',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidStore: {
            summary: 'Invalid store',
            value: {
              message: 'Related store not found',
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
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
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
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    schema: {
      example: {
        status_code: 409,
        message: 'Like already exists',
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
        message: "Success",
        data: [
          {
            id: "a6915609-0580-422c-994b-a11e573cd698",
            created_at: "2025-01-27",
            updated_at: "2025-01-27",
            store_id: "64efa2f4-665c-4dfe-984e-ea852c03dd10",
            debtor_id: "1a55a3b3-46fc-46f1-8fed-e6b6f211213c"
          }
        ]
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input.',
    content: {
      'application/json': {
        examples: {
          notFound: {
            value: {
              error: 'Bad Request',
              message:'Like not found',
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
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
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
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Like not found',
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
        message: "Success",
        data: {
          id: "a6915609-0580-422c-994b-a11e573cd698",
          created_at: "2025-01-27",
          updated_at: "2025-01-27",
          store_id: "64efa2f4-665c-4dfe-984e-ea852c03dd10",
          debtor_id: "1a55a3b3-46fc-46f1-8fed-e6b6f211213c"
        }
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
          notfound: {
            summary: 'not found',
            value: {
              message: 'Like not found',
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
    schema: {
      example: {
        status_code: 401,
        message: 'Unauthorized',
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
      },
    },
  })
  @Get(':id')
  async getLikeById(@Param('id') id: string) {
    return this.likesService.findOneLikeById(id);
  }
  @ApiOperation({ summary: 'Delete a like by id' })
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
        message: "Deleted",
        data: {
          id: "a6915609-0580-422c-994b-a11e573cd698"
        }
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad reqest errors',
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
          notfound: {
            summary: 'not found',
            value: {
              message: 'Like not found',
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    schema: {
      example: {
        status_code: 403,
        message: 'Forbidden',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: {
        status_code: 404,
        message: 'Like not found',
      },
    },
  })
  @Delete(':id')
  async deleteLike(@Param('id') id: string) {
    return this.likesService.deleteLikeById(id);
  }
}
