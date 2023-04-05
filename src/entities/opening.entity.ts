import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity('opening')
export class Open {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column()
  storeName!: string;

  @Column({ default: '00:00 às 00:00' })
  monday!: string;

  @Column({ default: '00:00 às 00:00' })
  tuesday!: string;

  @Column({ default: '00:00 às 00:00' })
  wednesday!: string;

  @Column({ default: '00:00 às 00:00' })
  thursday!: string;

  @Column({ default: '00:00 às 00:00' })
  friday!: string;

  @Column({ default: '00:00 às 00:00' })
  saturday!: string;

  @Column({ default: '00:00 às 00:00' })
  sunday!: string;

  @OneToOne(() => Store, (store) => store.open_)
  store_!: Store;
}
