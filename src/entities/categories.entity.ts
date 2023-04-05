import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity('category')
export class Category {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ length: 30 })
  name!: string;

  @Column({ length: 200 })
  desc!: string;

  @Column()
  image!: string;

  @ManyToOne(() => Store, (store) => store.categories_)
  store_!: Store;
}
