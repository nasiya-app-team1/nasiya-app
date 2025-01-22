import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stores {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'decimal' })
  wallet: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;
}
