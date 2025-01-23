import { BaseEntity } from 'src/common/database/baseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Stores extends BaseEntity {
  @Column({ type: 'varchar', length: 25, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 25 })
  password: string;

  @Column({ type: 'int' })
  wallet: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;
}
