import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { StoreEntity } from 'src/core/entity/stores.entity';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';
import { GuardModule } from 'src/common/guard';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity]), GuardModule],
  controllers: [StoresController],
  providers: [StoresService, BcryptService],
  exports: [StoresService],
})
export class StoresModule {}
