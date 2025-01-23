import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class DebtsImage extends BaseEntity {
  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'varchar' })
  debts_id: string;
}
