import { BaseEntity } from 'src/common/database/baseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Stores extends BaseEntity {

  @Column({ type: 'varchar', length: 25, unique: true,})
  email: string;

  @Column({ type: 'varchar', length: 25, unique: true })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({type:'varchar',unique:true})
  phone_number:string

  @Column({ type: 'varchar', length: 4 })
  pass_code: string;
  
  @Column({ type: 'int' })
  wallet: number;

  @Column({ type: 'varchar'})
  image: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;
}
