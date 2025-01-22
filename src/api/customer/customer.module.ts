import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CacheInterceptor } from '@nestjs/cache-manager';
import { CustomerEntity } from 'src/core/entity/customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
// import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
