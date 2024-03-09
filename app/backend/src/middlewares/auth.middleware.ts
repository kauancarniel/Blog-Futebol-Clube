import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import SequelizeUser from '../database/models/SequelizeUser';

type TokenPayload = {
  id: number,
  username: string,
};

class authMiddleware {
  static async auth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const tkn = authorization.split(' ')[1];

    const verify = (token: string): TokenPayload => {
      const data = jwt.verify(token, 'secret') as TokenPayload;
      return data;
    };
    try {
      const decoded = verify(tkn);
      const user = await SequelizeUser.findOne({ where: { username: decoded.username } });
      if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
      req.body.info = user;
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default authMiddleware;
