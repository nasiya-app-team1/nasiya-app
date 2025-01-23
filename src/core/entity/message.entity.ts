import { BaseEntity } from "src/common/database/baseEntity";
import {Column, Entity } from "typeorm";
// export enum Message {
//     SENT = 'sent',
//     FAILED = 'failed',
//     PENDING = 'pending',
// }

@Entity('message')
export class MessageEntity extends BaseEntity {
    @Column({ type: 'varchar', name: 'store_id' })
    store_id: string;

    @Column({ type: 'varchar', name: 'debtor_id' })
    debtor_id: string;

    @Column({type: 'varchar', name: 'content'})
    content: string;

    // @Column({ type: 'enum', name: 'status' })
    // status: Message;

    @Column({ type: 'varchar', name: 'sample_message_id' })
    sample_message_id: string;
}