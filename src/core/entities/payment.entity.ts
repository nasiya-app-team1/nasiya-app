import { BaseEntity } from 'src/common/database/baseEntity';
import { PaymentType } from 'src/common/enum/payment.enum';
import { Entity, Column } from 'typeorm';
const enum type {
  a = 'a',
}
@Entity()
export class Payment extends BaseEntity {
  @Column({ type: 'varchar' })
  sum: number;
  @Column({ type: 'date', default: new Date() })
  date: Date;
  @Column({ type: 'varchar' })
  type: type;
  @Column({ type: 'int' })
  sum: number;
  @Column({ type: 'date', default: new Date() })
  date: Date;
  @Column({ type: 'enum',enum:PaymentType })
  type: PaymentType
}
