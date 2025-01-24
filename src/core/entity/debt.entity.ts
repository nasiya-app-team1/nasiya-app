import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DebtsPeriod } from 'src/common/enum/debts.enum';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtorEntity } from './debtor.entity';
import { DebtImageEntity } from './debt-image.entity';
import { PaymentEntity } from './payment.entity';

@Entity('debts')
export class DebtEntity extends BaseEntity {
  @Column({ type: 'date' })
  debt_date: Date;

  @Column({ type: 'varchar', name: 'debtor_id' })
  debtor_id: string;

  @Column({ type: 'enum', enum: DebtsPeriod })
  debt_period: DebtsPeriod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  debt_sum: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => DebtImageEntity, (debtImage) => debtImage.debt)
  debtImages: DebtImageEntity[];

  @OneToMany(() => PaymentEntity, (paymetn) => paymetn.debt)
  paymetns: PaymentEntity[];

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.debts)
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
