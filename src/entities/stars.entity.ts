import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity('star')
export class Star {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column()
  storeName!: string;

  @Column()
  clientName!: string;

  @Column()
  note!: Number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ length: 100, default: '' })
  comment!: string;

  @ManyToOne(() => Store, (store) => store.stars_)
  store_!: Store;
}
