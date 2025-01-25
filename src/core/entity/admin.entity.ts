import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { RoleAdmin } from 'src/common/enum/admin.enum';

@Entity('admins')
export class AdminEntity extends BaseEntity {
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

  @Column({
    type: 'enum',
    enum: RoleAdmin,
    name: 'role',
    default: RoleAdmin.ADMIN,
  })
  role: RoleAdmin;
}
