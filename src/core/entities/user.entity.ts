import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'int' })
  balance: number;

  @Column({ type: 'varchar', unique: true })
  email: string;
}
