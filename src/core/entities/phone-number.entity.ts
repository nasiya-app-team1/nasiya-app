import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtorEntity } from './debtor.entity';

export class PhoneNumberEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'phone_number' })
  phone_number: string;

  @Column({ type: 'varchar', name: 'debtor_id' })
  debtor_id: string;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.debtorImages)
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
