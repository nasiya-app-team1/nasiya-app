import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { SampleMessageEntity } from './sample_message.entity';
import { MessageEntity } from './message.entity';
import { LikeEntity } from './likes.entity';
import { DebtorEntity } from './debtor.entity';

@Entity('stores')
export class StoreEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'full_name' })
  full_name: string;

  @Column({ type: 'varchar', name: 'email', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'login', length: 25, unique: true })
  login: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ type: 'varchar', name: 'phone_number', unique: true })
  phone_number: string;

  @Column({ type: 'varchar', name: 'pass_code', length: 4 })
  pass_code: string;

  @Column({ type: 'decimal', name: 'wallet', precision: 10, scale: 2 })
  wallet: number;

  @Column({ type: 'varchar', name: 'image', nullable: true })
  image: string;

  @Column({ type: 'boolean', name: 'is_active', default: false })
  is_active: boolean;

  @OneToMany(
    () => SampleMessageEntity,
    (sampleMessage) => sampleMessage.store,
    { cascade: true },
  )
  sampleMessages: SampleMessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.store, { cascade: true })
  messages: MessageEntity[];

  @OneToMany(() => LikeEntity, (like) => like.store, { cascade: true })
  likes: LikeEntity[];

  @OneToMany(() => DebtorEntity, (debtor) => debtor.store, { cascade: true })
  debtors: DebtorEntity[];
}
