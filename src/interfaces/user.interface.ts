export interface IUserRes {
  id: number;
  name: string;
  email: string;
  registered_at: Date;
  storeId: number | null;
}
