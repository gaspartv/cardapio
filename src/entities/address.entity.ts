import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity('address')
export class Address {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column()
  zipcode!: string;

  @Column()
  street!: string;

  @Column()
  streetNumber!: Number;

  @Column()
  borough!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @OneToOne(() => Store, (store) => store.address_)
  store_!: Store;
}
