import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import authMiddleware from '../middlewares/auth.middleware';

const leaderController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderController.leaderboard(req, res),
);

export default router;
