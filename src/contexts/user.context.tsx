import { useRouter } from 'next/router';
import React from 'react';
import { IContextProps } from '../interfaces/global.interfaces';
import {
  IUserAddress,
  IUserContext,
  IUserRes,
} from '../interfaces/user.interfaces';

export const UserContext = React.createContext({} as IUserContext);

const UserProvider = ({ children }: IContextProps) => {
  const router = useRouter();

  const [user, setUser] = React.useState<IUserRes | null>(null);

  const [userAddress, setUserAddress] = React.useState<IUserAddress | null>(
    null
  );

  const userLogout = (): void => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <UserContext.Provider
      value={{ userLogout, user, setUser, userAddress, setUserAddress }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
