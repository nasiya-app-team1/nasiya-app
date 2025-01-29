import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { GuardService, GuardModule } from 'src/common/index.common';
import { config } from 'src/config';
import { StoresModule } from './stores/stores.module';
import { SampleMessagesModule } from './sample_messages/sample_messages.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { MessagesModule } from './messages/messages.module';
import { DebtorModule } from './debtor/debtor.module';
import { DebtsModule } from './debts/debts.module';
import { DebtorImagesModule } from './debtor-images/debtor-images.module';
import { DebtsImagesModule } from './debts-images/debts-images.module';
import { PhoneNumbersModule } from './phone-numbers/phone-numbers.module';
import { LikesModule } from './likes/likes.module';
import { FileModule } from './file-service/file-service.module';

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
    PaymentModule,
    GuardModule,
    AdminModule,
    MessagesModule,
    LikesModule,
    DebtorModule,
    DebtsModule,
    DebtorImagesModule,
    DebtsImagesModule,
    PhoneNumbersModule,
    FileModule,
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
