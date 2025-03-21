import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import authMiddleware from '../middlewares/auth.middleware';

const leaderController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderController.leaderboardAll(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderController.leaderboard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderController.leaderboardAway(req, res),
);

export default router;
