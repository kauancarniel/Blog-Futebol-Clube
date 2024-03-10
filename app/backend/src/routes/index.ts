import { Router } from 'express';
import TeamRouter from './teams.routes';
import UserRouter from './user.router';
import MatchRouter from './match.router';
import LeaderRouter from './leaderboard.router';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderRouter);

export default router;
