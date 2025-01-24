import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BcryptService } from 'src/infrastructure';
import { Admin } from 'src/core';
import { GuardModule } from 'src/common/index.common';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), GuardModule],
  controllers: [AdminController],
  providers: [AdminService, BcryptService],
})
export class AdminModule {}
