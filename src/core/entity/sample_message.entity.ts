import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { StoreEntity } from './stores.entity';
import { MessageEntity } from './message.entity';

@Entity('sample_messages')
export class SampleMessageEntity extends BaseEntity {
  @Column({ type: 'text', name: 'sample_text' })
  sample: string;

  @Column({ type: 'uuid', name: 'store_id' })
  store_id: string;

  @ManyToOne(() => StoreEntity, (store) => store.sampleMessages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @OneToMany(() => MessageEntity, (message) => message.sampleMessage, {
    cascade: true,
  })
  messages: MessageEntity[];
}
