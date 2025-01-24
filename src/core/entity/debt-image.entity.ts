import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtEntity } from './debt.entity';

@Entity()
export class DebtImageEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'varchar' })
  debts_id: string;

  @ManyToOne(() => DebtEntity, (debt) => debt.debtImages)
  @JoinColumn({ name: 'debts_id' })
  debt: DebtEntity[];
}
