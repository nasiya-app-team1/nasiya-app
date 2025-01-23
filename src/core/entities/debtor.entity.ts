import { Entity, Column, OneToMany } from 'typeorm';
import { DebtEntity } from './debt.entity';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity('debtors')
export class DebtorEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  full_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @OneToMany(() => DebtEntity, (debt) => debt.debtor, { cascade: true })
  debts: DebtEntity[];
}
