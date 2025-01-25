import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeEntity } from 'src/core/entity/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
