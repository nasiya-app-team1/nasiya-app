import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/core/entities/admin.entity';
import { GuardModule } from 'src/common/guard/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), GuardModule],
  controllers: [AdminController],
  providers: [AdminService, BcryptService],
})
export class AdminModule {}
