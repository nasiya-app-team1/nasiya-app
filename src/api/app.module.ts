import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardService } from 'src/common/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GuardModule } from 'src/common/guard/jwt.module';
import { config } from 'src/config/config.service';
import { DebtorModule } from './debtor/debtor.module';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    GuardModule,
    DebtorModule,
    DebtsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GuardService,
    },
  ],
  exports: [],
})
export class AppModule {}
