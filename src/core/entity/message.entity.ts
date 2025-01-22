import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

    @Column({ type: 'varchar', name: 'name' })
    name: string;

    @Column({ type: 'varchar', name: 'address' })
    address: string;

    @Column({ type: 'float', name: 'balance' })
    balance: number;

    @Column({ type: 'varchar', name: 'note', nullable: true })
    note: string;

    @Column({ type: 'boolean', name: 'is_liked' })
    is_liked: boolean;
}
