import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity('deliveryOrWithdraw')
export class DeliveryOrWithdraw {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ default: false })
  delivery!: boolean;

  @Column({ default: false })
  whithdraw!: boolean;

  @OneToOne(() => Store, (store) => store.deliveryOrWithdraw_)
  store_!: Store;
}
