import { BaseEntity } from 'src/common/database/baseEntity';
import { Column } from 'typeorm';

export class PhoneNumber extends BaseEntity {
  @Column({ type: 'varchar', name: 'phone_number' })
  phone_number: string;

  @Column({ type: 'varchar', name: 'debtor_id' })
  debtor_id: string;
}
