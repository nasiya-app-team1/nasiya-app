import { Module } from '@nestjs/common';
import { DebtorImagesService } from './debtor-images.service';
import { DebtorImagesController } from './debtor-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorImageEntity } from 'src/core/entities/debtor-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtorImageEntity])],
  controllers: [DebtorImagesController],
  providers: [DebtorImagesService],
})
export class DebtorImagesModule {}
