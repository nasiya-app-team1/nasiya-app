import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { StoreEntity } from './stores.entity';
import { MessageEntity } from './message.entity';

@Entity()
export class SampleMessageEntity extends BaseEntity {
  @Column({ type: 'text' })
  sample: string;

  @Column({ type: 'varchar', name: 'store_id' })
  store_id: string;

  @ManyToOne(() => StoreEntity, (stores) => stores.sampleMessages)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @OneToMany(() => MessageEntity, (message) => message.sampleMessage)
  messages: MessageEntity[];
}
