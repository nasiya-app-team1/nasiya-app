import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'text' })
    text: string;

   @CreateDateColumn({ name: 'created_at',default:new Date() })
    created_at: Date;
}
