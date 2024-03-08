import { IUser } from './IUsers';

export type ret = { dataValues: IUser };

export interface IUserModel {
  login(email: IUser['email']): Promise<ret | null>;
}
