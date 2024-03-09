import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import authMiddleware from '../middlewares/auth.middleware';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.findAll(req, res),
);

router.patch(
  '/:id/finish',
  authMiddleware.auth,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  authMiddleware.auth,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default router;
