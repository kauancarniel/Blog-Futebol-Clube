import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import validEmail from '../middlewares/ValidEmail';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validEmail.validEmail,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
