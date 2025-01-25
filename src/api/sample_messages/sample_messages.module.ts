import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleMessagesService } from './sample_messages.service';
import { SampleMessagesController } from './sample_messages.controller';
import { SampleMessageEntity } from 'src/core/entity/sample_message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleMessageEntity])],
  controllers: [SampleMessagesController],
  providers: [SampleMessagesService],
  exports: [SampleMessagesService],
})
export class SampleMessagesModule {}
