import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { PaymentType } from 'src/common/enum/payment.enum';
import { DebtEntity } from './debt.entity';

@Entity()
export class PaymentEntity extends BaseEntity {
  @Column({ type: 'date', default: new Date() })
  date: Date;

  @Column({ type: 'decimal' })
  sum: number;

  @Column({ type: 'varchar', name: 'debt_id' })
  debt_id: string;

  @Column({ type: 'enum', enum: PaymentType })
  type: PaymentType;

  @ManyToOne(() => DebtEntity, (debt) => debt.paymetns)
  @JoinColumn({ name: 'debt_id' })
  debt: DebtEntity;
}
