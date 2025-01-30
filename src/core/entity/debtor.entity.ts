import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DebtEntity } from './debt.entity';
import { BaseEntity } from 'src/common/database/baseEntity';
import { StoreEntity } from './stores.entity';
import { MessageEntity } from './message.entity';
import { LikeEntity } from './likes.entity';
import { DebtorImageEntity } from './debtor-image.entity';
import { PhoneNumberEntity } from './phone-number.entity';

@Entity('debtors')
export class DebtorEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'full_name', length: 40, nullable: true })
  full_name: string;

  @Column({ type: 'varchar', name: 'address', nullable: true })
  address: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'uuid', name: 'store_id' })
  store_id: string;

  @Column({ type: 'boolean', name: 'is_liked', default: false })
  is_liked: boolean;

  @OneToMany(() => DebtEntity, (debt) => debt.debtor, { cascade: true })
  debts: DebtEntity[];

  @OneToMany(() => LikeEntity, (like) => like.debtor, { cascade: true })
  likes: LikeEntity[];

  @OneToMany(() => MessageEntity, (message) => message.debtor, {
    cascade: true,
  })
  messages: MessageEntity[];

  @OneToMany(() => DebtorImageEntity, (debtorImage) => debtorImage.debtor, {
    cascade: true,
  })
  debtorImages: DebtorImageEntity[];

  @OneToMany(() => PhoneNumberEntity, (phoneNumber) => phoneNumber.debtor, {
    cascade: true,
  })
  phoneNumbers: PhoneNumberEntity[];

  @ManyToOne(() => StoreEntity, (store) => store.debtors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
