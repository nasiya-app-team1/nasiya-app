import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('phone_numbers')
export class PhoneNumber extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'phone_number' })
  phone_number: string;

  @Column({ type: 'varchar', name: 'owner_id' })
  owner_id: string;
}
