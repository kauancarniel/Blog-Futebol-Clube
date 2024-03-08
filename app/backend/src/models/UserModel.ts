import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUsersModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    return user;
  }
}
