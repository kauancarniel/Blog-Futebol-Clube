import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import authMiddleware from '../middlewares/auth.middleware';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  authMiddleware.auth,
  (req: Request, res: Response) => matchController.findAll(req, res),
);

export default router;
