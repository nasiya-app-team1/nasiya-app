import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';
export enum MessageStatus {
    SENT = 'sent',
    FAILED = 'failed',
    PENDING = 'pending',
}

@Entity('message')
export class MessageEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'store_id' })
  store_id: string;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtor_id: string;

  @Column({ type: 'varchar', name: 'message' })
  message: string;

  @Column({ 
    type: 'enum', 
    enum: MessageStatus,
    name: 'status',
    default: MessageStatus.PENDING 
  })
  status: MessageStatus;

  @Column({ type: 'uuid', name: 'sample_message_id' })
  sample_message_id: string;
}
