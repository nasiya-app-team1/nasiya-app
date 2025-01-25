import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { SampleMessageEntity } from './sample_message.entity';
import { StoreEntity } from './stores.entity';
import { DebtorEntity } from './debtor.entity';
import { MessageStatus } from 'src/common/enum/message.enum';

@Entity('messages')
export class MessageEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'store_id' })
  storeId: string;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtorId: string;

  @Column({ type: 'text', name: 'message' })
  message: string;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    name: 'status',
    default: MessageStatus.PENDING,
  })
  status: MessageStatus;

  @Column({ type: 'uuid', name: 'sample_message_id' })
  sampleMessageId: string;

  @ManyToOne(() => StoreEntity, (store) => store.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @ManyToOne(
    () => SampleMessageEntity,
    (sampleMessage) => sampleMessage.messages,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'sample_message_id' })
  sampleMessage: SampleMessageEntity;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
