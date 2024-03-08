import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await this.userService.login(email, password);
    if (data.status === 'UNAUTHORIZED') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json(data.data);
  }
}
