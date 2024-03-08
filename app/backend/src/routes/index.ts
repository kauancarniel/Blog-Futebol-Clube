import { Router } from 'express';
import TeamRouter from './teams.routes';
import UserRouter from './user.router';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);

export default router;
