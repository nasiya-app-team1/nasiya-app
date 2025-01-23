import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { SampleMessageEntity } from './sample_message.entity';
import { StoreEntity } from './stores.entity';
import { DebtorEntity } from './debtor.entity';
import { MessageStatus } from 'src/common/enum/message.enum';

@Entity('message')
export class MessageEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'store_id' })
  store_id: string;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtor_id: string;

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
  sample_message_id: string;

  @ManyToOne(() => StoreEntity, (store) => store.messages)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @ManyToOne(
    () => SampleMessageEntity,
    (sampleMessage) => sampleMessage.messages,
  )
  @JoinColumn({ name: 'sample_message_id' })
  sampleMessage: SampleMessageEntity;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.messages)
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
