import { BaseEntity } from 'src/common/database/baseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @Column({ type: 'number' })
  sum: number;
  @Column({ type: 'date', default: new Date() })
  date: Date;
  @Column({ type: 'enum' })
  type: string;
}
