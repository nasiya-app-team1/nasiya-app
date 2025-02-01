import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtorEntity } from './debtor.entity';

@Entity('phone_numbers')
export class PhoneNumberEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'phone_number', length: 15 })
  phone_number: string;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtor_id: string;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.phoneNumbers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
