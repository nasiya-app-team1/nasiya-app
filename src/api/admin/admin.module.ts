import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BcryptService } from 'src/infrastructure';
import { AdminEntity } from 'src/core';
import { GuardModule } from 'src/common/index.common';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), GuardModule, StoresModule],
  controllers: [AdminController],
  providers: [AdminService, BcryptService],
})
export class AdminModule {}
