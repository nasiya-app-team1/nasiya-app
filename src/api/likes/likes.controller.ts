import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // Create a like
  @Post()
  async createLike(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  // Get all likes
  @Get()
  async getAllLikes() {
    return this.likesService.findAll();
  }

  // Get a like by ID
  @Get(':id')
  async getLikeById(@Param('id') id: string) {
    return this.likesService.findOneById(id);
  }

  // Update a like
  @Put(':id')
  async updateLike(
    @Param('id') id: string,
    @Body() updateLikeDto: UpdateLikeDto,
  ) {
    return this.likesService.update(id, updateLikeDto);
  }

  // Delete a like
  @Delete(':id')
  async deleteLike(@Param('id') id: string) {
    return this.likesService.delete(id);
  }
}
