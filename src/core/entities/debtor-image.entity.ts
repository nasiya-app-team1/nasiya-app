import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class DebtorImage extends BaseEntity {
  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'varchar' })
  debtor_id: string;
}
