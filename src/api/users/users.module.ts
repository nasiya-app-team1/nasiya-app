import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { BcryptModule } from 'src/infrastructure/bcrypt/bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BcryptModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
