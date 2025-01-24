import { Module } from '@nestjs/common';
import { SampleMessagesService } from './sample_messages.service';
import { SampleMessagesController } from './sample_messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleMessageEntity } from 'src/core/entity/sample_message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleMessageEntity])],
  controllers: [SampleMessagesController],
  providers: [SampleMessagesService],
})
export class SampleMessagesModule {}
