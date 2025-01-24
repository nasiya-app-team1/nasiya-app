import { Module } from '@nestjs/common';
import { DebtsImagesService } from './debts-images.service';
import { DebtsImagesController } from './debts-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtImageEntity } from 'src/core/entity/debt-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtImageEntity])],
  controllers: [DebtsImagesController],
  providers: [DebtsImagesService],
})
export class DebtsImagesModule {}
