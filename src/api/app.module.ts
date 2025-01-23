import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresModule } from './stores/stores.module';
import { SampleMessagesModule } from './sample_messages/sample_messages.module';
import { PaymentModule } from 'src/api/payment/payment.module';
import { GuardService } from 'src/common/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GuardModule } from 'src/common/guard/jwt.module';
import { config } from 'src/config/config.service';
import { AdminModule } from './admin/admin.module';
import { MessagesModule } from './messages/messages.module';
import { DebtorModule } from './debtor/debtor.module';
import { DebtsModule } from './debts/debts.module';
import { LikesModule } from './likes/likes.module';

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
    StoresModule,
    SampleMessagesModule,
    // PaymentModule,
    GuardModule,
    AdminModule,
    MessagesModule,
    LikesModule,
    DebtorModule,
    DebtsModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: GuardService,
    // },
  ],
  exports: [],
})
export class AppModule {}
