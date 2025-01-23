import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'number' })
  sum: number;
  @Column({ type: 'date', default: new Date() })
  date: Date;
  @Column({ type: 'enum' })
  type: string;
}
