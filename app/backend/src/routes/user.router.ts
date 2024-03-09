import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import validEmail from '../middlewares/ValidEmail';
import authMiddleware from '../middlewares/auth.middleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validEmail.validEmail,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  authMiddleware.auth,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
