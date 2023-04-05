import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Category } from './categories.entity';
import { DeliveryOrWithdraw } from './deliveryOrWithdraw.entities';
import { Open } from './opening.entity';
import { Product } from './products.entity';
import { Star } from './stars.entity';
import { User } from './user.entity';

@Entity('store')
export class Store {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ length: 30 })
  name!: string;

  @Column({ length: 200 })
  desc!: string;

  @Column({ length: 18, unique: true })
  cnpj!: string;

  @Column()
  pix!: string;

  @Column({ length: 14 })
  phone!: string;

  @Column()
  minimumOrder!: Number;

  @Column()
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => User, (user) => user.store_)
  user_!: User;

  @OneToOne(() => Open, (open) => open.store_)
  @JoinColumn()
  open_!: Open;

  @OneToOne(() => Address, (address) => address.store_)
  @JoinColumn()
  address_!: Address;

  @OneToOne(
    () => DeliveryOrWithdraw,
    (deliveryOrWithdraw) => deliveryOrWithdraw.store_,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn()
  deliveryOrWithdraw_!: DeliveryOrWithdraw;

  @OneToMany(() => Product, (product) => product.store_)
  products_!: Product;

  @OneToMany(() => Star, (star) => star.store_)
  stars_!: Star;

  @OneToMany(() => Category, (category) => category.store_)
  categories_!: Category;
}
