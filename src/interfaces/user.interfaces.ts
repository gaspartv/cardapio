export interface IUserContext {
  userLogout: () => void;

  user: IUserRes | null;
  setUser: React.Dispatch<React.SetStateAction<IUserRes | null>>;

  userAddress: IUserAddress | null;
  setUserAddress: React.Dispatch<React.SetStateAction<IUserAddress | null>>;
}

export interface IUserRes {
  id: number;
  name: string;
  email: string;
  registered_at: Date;
  employee: boolean;
  isAdmin: boolean;
  addressId: number | null;
  storeId: number | null;
}

export interface IUserCreate {
  name: string;
  email: string;
}

export interface IUserRecovery {
  email: string;
}

export interface IUserAddress {
  id: string;
  name: string;
  zipcode: string;
  street: string;
  streetNumber: string;
  borough: string;
  city: string;
  state: string;
}
