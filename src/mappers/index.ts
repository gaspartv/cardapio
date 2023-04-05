import { User } from '@prisma/client';
import { IUserRes } from '../interfaces/user.interface';

export class CreateUserRes {
  static handle({ id, name, email, registered_at, storeId }: User): IUserRes {
    return {
      id,
      name,
      email,
      registered_at,
      storeId,
    };
  }
}
