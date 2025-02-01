import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { DebtEntity } from './debt.entity';

@Entity('debt_images')
export class DebtImageEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'uuid', name: 'debt_id' })
  debt_id: string;

  @ManyToOne(() => DebtEntity, (debt) => debt.debtImages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'debt_id' })
  debt: DebtEntity;
}
