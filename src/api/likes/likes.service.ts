import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from 'src/core/entities/likes.entity';
import { LikeRepository } from 'src/core/repositories/like.repository';

@Injectable()
export class LikesService extends BaseService<
  CreateLikeDto,
  DeepPartial<LikeEntity>
> {
  constructor(
    @InjectRepository(LikeEntity)
    protected readonly repository: LikeRepository,
  ) {
    super(repository);
  }
}
