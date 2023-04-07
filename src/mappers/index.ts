import { User } from '@prisma/client';
import { IUserRes } from '../interfaces/user.interfaces';

export class CreateUserRes {
  static handle({
    id,
    name,
    email,
    addressId,
    registered_at,
    employee,
    isAdmin,
    storeId,
  }: User): IUserRes {
    return {
      id,
      name,
      email,
      registered_at,
      employee,
      isAdmin,
      addressId,
      storeId,
    };
  }
}
