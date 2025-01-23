import { BaseEntity } from 'src/common/database/baseEntity';
import { PaymentType } from 'src/common/enum/payment.enum';
import { Entity, Column } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @Column({ type: 'int' })
  sum: number;
  @Column({ type: 'date', default: new Date() })
  date: Date;
  @Column({ type: 'enum',enum:PaymentType })
  type: PaymentType
}
