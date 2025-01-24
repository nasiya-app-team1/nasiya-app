import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { SampleMessageEntity } from './sample_message.entity';
import { MessageEntity } from './message.entity';
import { LikeEntity } from './likes.entity';
import { DebtorEntity } from './debtor.entity';

@Entity()
export class StoreEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 40 })
  full_name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 25, unique: true })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 4 })
  pass_code: string;

  @Column({ type: 'decimal' })
  wallet: number;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @OneToMany(() => SampleMessageEntity, (sampleMessage) => sampleMessage.store)
  sampleMessages: SampleMessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.store)
  messages: MessageEntity[];

  @OneToMany(() => LikeEntity, (like) => like.store)
  likes: LikeEntity[];

  @OneToMany(() => DebtorEntity, (debtor) => debtor.store)
  debtors: DebtorEntity[];
}
