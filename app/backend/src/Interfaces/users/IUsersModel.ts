import { IUser } from './IUsers';

export interface IUserModel {
  login(email: IUser['email']): Promise<IUser | null>;
}
