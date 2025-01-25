import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DebtsPeriod } from 'src/common/enum/debts.enum';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtorEntity } from './debtor.entity';
import { DebtImageEntity } from './debt-image.entity';
import { PaymentEntity } from './payment.entity';

@Entity('debts')
export class DebtEntity extends BaseEntity {
  @Column({ type: 'date', name: 'debt_date' })
  debt_date: Date;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtor_id: string;

  @Column({ type: 'enum', enum: DebtsPeriod, name: 'debt_period' })
  debt_period: DebtsPeriod;

  @Column({ type: 'decimal', name: 'debt_sum', precision: 10, scale: 2 })
  debt_sum: number;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string;

  @OneToMany(() => DebtImageEntity, (debtImage) => debtImage.debt, {
    cascade: true,
  })
  debtImages: DebtImageEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.debt, { cascade: true })
  payments: PaymentEntity[];

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.debts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
