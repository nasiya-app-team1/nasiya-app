import { Module } from '@nestjs/common';
import { DebtsImagesService } from './debts-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtImageEntity } from 'src/core/entity/debt-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtImageEntity])],
  controllers: [],
  providers: [DebtsImagesService],
})
export class DebtsImagesModule {}
