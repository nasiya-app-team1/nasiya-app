import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SampleMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  sample: string;
}
