import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorImagesService } from './debtor-images.service';
import { DebtorImageEntity } from 'src/core/entity/debtor-image.entity';
import { FileModule } from '../file-service/file-service.module';
import { DebtorImagesController } from './debtor-images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DebtorImageEntity]), FileModule],
  controllers: [DebtorImagesController],
  providers: [DebtorImagesService],
  exports: [DebtorImagesService],
})
export class DebtorImagesModule {}
