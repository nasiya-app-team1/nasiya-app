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
  @Column({ type: 'varchar', length: 40, nullable: true })
  full_name: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'store_id' })
  store_id: string;

  @OneToMany(() => DebtEntity, (debt) => debt.debtor)
  debts: DebtEntity[];

  @OneToMany(() => LikeEntity, (like) => like.debtor)
  likes: LikeEntity[];

  @OneToMany(() => MessageEntity, (message) => message.debtor)
  messages: MessageEntity[];

  @OneToMany(() => DebtorImageEntity, (debtorImage) => debtorImage.debtor)
  debtorImages: DebtorImageEntity[];

  @OneToMany(() => PhoneNumberEntity, (phoneNumber) => phoneNumber.debtor)
  phoneNumbers: PhoneNumberEntity[];

  @ManyToOne(() => StoreEntity, (store) => store.debtors)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
