import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { StoreEntity } from 'src/core/entity/stores.entity';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';
import { GuardModule } from 'src/common/guard';
import { FileModule } from '../file-service/file-service.module';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity]), GuardModule, FileModule],
  controllers: [StoresController],
  providers: [StoresService, BcryptService],
  exports: [StoresService],
})
export class StoresModule {}
