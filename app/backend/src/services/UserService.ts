import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { IUser } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

// , password: IUser['password']

type Token = { token: string };
const secret = process.env.JWT_SECRET || 'secret';
type TokenPayload = {
  id: number,
  username: string,
};

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(email: IUser['email'], password: IUser['password'])
    : Promise<ServiceResponse<Token>> {
    const user = await this.userModel.login(email) as any;
    if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Username ou password inválidos' } };
    }

    const { id, username } = user.dataValues;

    const sign = (payload: TokenPayload): string => {
      const token = jwt.sign(payload, secret);
      return token;
    };

    const token = sign({ id, username });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
