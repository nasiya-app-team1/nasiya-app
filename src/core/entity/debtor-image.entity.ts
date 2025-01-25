import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtorEntity } from './debtor.entity';

@Entity('debtor_images')
export class DebtorImageEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtorId: string;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.debtorImages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
