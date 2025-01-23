import { BaseEntity } from "src/common/database/baseEntity";
import { Column, Entity } from "typeorm";

@Entity('likes')
export class LikesEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'store_id' })
  store_id: string;

  @Column({ type: 'uuid', name: 'debtor_id' })
  debtor_id: string;
}
