import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ length: 30 })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ length: 150 })
  password!: string;

  @CreateDateColumn()
  registered_at!: Date;

  @OneToOne(() => Store, (store) => store.user_)
  @JoinColumn()
  store_!: Store;
}

