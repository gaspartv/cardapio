import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ length: 30, default: 'Des' })
  name!: string;

  @ManyToOne(() => Store, (store) => store.products_)
  store_!: Store;
}
