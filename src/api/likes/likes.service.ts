import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from 'src/core/entity/likes.entity';
import { LikeRepository } from 'src/core/repository/like.repository';
import { UpdateLikeDto } from './dto';

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

  async createLike(dto: CreateLikeDto) {
    const [debtor, store, like] = await Promise.all([
      this.getRepository.findOneBy({ id: dto.debtor_id }),
      this.getRepository.findOneBy({ id: dto.store_id }),
      this.getRepository.findOne({
        where: { debtor_id: dto.debtor_id, store_id: dto.store_id },
      }),
    ]);
    if (like) {
      throw new ConflictException('Like already exists');
    }
    if (!debtor) {
      throw new BadRequestException('Related debtor not found');
    }
    if (!store) {
      throw new BadRequestException('Related store not found');
    }
    return await this.create(dto);
  }

  async updateLike(id: string, dto: UpdateLikeDto) {
    const [debtor, store] = await Promise.all([
      dto.store_id
        ? this.getRepository.findOneBy({ id: dto.debtor_id })
        : Promise.resolve(null),
      dto.debtor_id
        ? this.getRepository.findOneBy({ id: dto.store_id })
        : Promise.resolve(null),
    ]);
    if (dto.store_id && !store) {
      throw new BadRequestException('Related store not found');
    }
    if (dto.debtor_id && !debtor) {
      throw new BadRequestException('Related debtor not found');
    }

    return await this.update(id, dto);
  }

  async findOneLikeById(id: string) {
    const like = await this.getRepository.findOneBy({ id });
    if (!like) {
      throw new BadRequestException('Like not found');
    }
    return await this.findOneById(id);
  }

  async deleteLikeById(id: string) {
    const like = await this.getRepository.findOneBy({ id });
    if (!like) {
      throw new BadRequestException('Like not found');
    }
    return await this.delete(id);
  }
}
