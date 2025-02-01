import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageEntity } from 'src/core/entity/message.entity';
import { StoresModule } from '../stores/stores.module';
import { DebtorModule } from '../debtor/debtor.module';
import { SampleMessagesModule } from '../sample_messages/sample_messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    StoresModule,
    DebtorModule,
    SampleMessagesModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
