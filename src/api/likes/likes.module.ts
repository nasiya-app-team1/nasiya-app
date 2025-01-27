import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeEntity } from 'src/core/entity/likes.entity';
import { DebtorModule } from '../debtor/debtor.module';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity]), DebtorModule, StoresModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
