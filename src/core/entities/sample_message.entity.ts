import { BaseEntity } from 'src/common/database/baseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class SampleMessage extends BaseEntity {
  @Column({ type: 'text' })
  sample: string;
}
