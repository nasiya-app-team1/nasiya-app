import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { StoreEntity } from './stores.entity';
import { DebtorEntity } from './debtor.entity';

@Entity('likes')
export class LikeEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'store_id' })
  storeId: string;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtorId: string;

  @ManyToOne(() => StoreEntity, (store) => store.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'debtor_id' })
  debtor: DebtorEntity;
}
