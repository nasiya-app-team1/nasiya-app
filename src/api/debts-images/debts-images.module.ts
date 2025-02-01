import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsImagesService } from './debts-images.service';
import { DebtImageEntity } from 'src/core/entity/debt-image.entity';
import { FileModule } from '../file-service/file-service.module';
import { DebtsImagesController } from './debts-images.contrller';

@Module({
  imports: [TypeOrmModule.forFeature([DebtImageEntity]), FileModule],
  controllers: [DebtsImagesController],
  providers: [DebtsImagesService],
  exports: [DebtsImagesService],
})
export class DebtsImagesModule {}
