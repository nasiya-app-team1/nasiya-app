import { Module } from '@nestjs/common';
import { DebtsImagesService } from './debts-images.service';
import { DebtsImagesController } from './debts-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsImage } from 'src/core/entities/debts-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtsImage])],
  controllers: [DebtsImagesController],
  providers: [DebtsImagesService],
})
export class DebtsImagesModule {}
