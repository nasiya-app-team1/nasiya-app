import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { PaymentType } from 'src/common/enum/payment.enum';
import { DebtEntity } from './debt.entity';

@Entity('payments')
export class PaymentEntity extends BaseEntity {
  @Column({ type: 'date', name: 'payment_date', default: () => 'CURRENT_DATE' })
  date: Date;

  @Column({ type: 'decimal', name: 'payment_sum', precision: 10, scale: 2 })
  sum: number;

  @Column({ type: 'uuid', name: 'debt_id' })
  debt_id: string;

  @Column({ type: 'enum', enum: PaymentType, name: 'payment_type' })
  type: PaymentType;

  @ManyToOne(() => DebtEntity, (debt) => debt.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'debt_id' })
  debt: DebtEntity;
}
