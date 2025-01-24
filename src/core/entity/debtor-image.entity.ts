import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtorEntity } from './debtor.entity';

@Entity()
export class DebtorImageEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'varchar', name: 'debtor_id' })
  debtor_id: string;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.debtorImages)
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
