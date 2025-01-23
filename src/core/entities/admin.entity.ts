import { BaseEntity } from 'src/common/database/baseEntity';
import { RoleAdmin } from 'src/common/enum';
import { Column, Entity } from 'typeorm';

@Entity('admins')
export class Admin extends BaseEntity {
  @Column({ type: 'varchar', name: 'username', unique: true })
  username: string;

  @Column({ type: 'varchar', name: 'hashed_password' })
  hashed_password: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    nullable: true,
    unique: true,
  })
  phone_number: string;

  @Column({ type: 'varchar', name: 'email', nullable: true, unique: true })
  email: string;

  @Column({ type: 'enum', enum: RoleAdmin, default: RoleAdmin.ADMIN })
  role: string;
}
