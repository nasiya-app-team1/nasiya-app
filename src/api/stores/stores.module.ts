import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stores } from 'src/core/entities/stores.entity';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stores])],
  controllers: [StoresController],
  providers: [StoresService,BcryptService],
})
export class StoresModule {}
