import { Module } from '@nestjs/common';
import { DebtorImagesService } from './debtor-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorImageEntity } from 'src/core/entity/debtor-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtorImageEntity])],
  controllers: [],
  providers: [DebtorImagesService],
})
export class DebtorImagesModule {}
