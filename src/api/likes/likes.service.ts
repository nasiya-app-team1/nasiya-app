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
import { DebtorService } from '../debtor/debtor.service';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class LikesService extends BaseService<
  CreateLikeDto,
  DeepPartial<LikeEntity>
> {
  constructor(
    @InjectRepository(LikeEntity)
    protected readonly repository: LikeRepository,
    private readonly debtorService: DebtorService,
    private readonly storeService: StoresService,
  ) {
    super(repository);
  }

  async createLike(dto: CreateLikeDto) {
    const [debtor, store, like] = await Promise.all([
      this.debtorService.getRepository.findOneBy({ id: dto.debtor_id }),
      this.storeService.getRepository.findOneBy({ id: dto.store_id }),
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
