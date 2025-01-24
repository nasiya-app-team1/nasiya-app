import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from 'src/core/entity/stores.entity';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';
import { GuardModule } from 'src/common/guard';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity]), GuardModule],
  controllers: [StoresController],
  providers: [StoresService, BcryptService],
})
export class StoresModule {}
