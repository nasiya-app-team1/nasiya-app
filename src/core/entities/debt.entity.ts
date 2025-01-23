import { Entity, Column, ManyToOne } from 'typeorm';
import { DebtsPeriod } from 'src/common/enum/debts.enum';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtorEntity } from './debtor.entity';

@Entity('debts')
export class DebtEntity extends BaseEntity {
  @Column({ type: 'date' })
  debt_date: Date;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.debts, {
    onDelete: 'CASCADE',
  })
  debtor: DebtorEntity;

  @Column({ type: 'enum', enum: DebtsPeriod })
  debt_period: DebtsPeriod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  debt_sum: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}
