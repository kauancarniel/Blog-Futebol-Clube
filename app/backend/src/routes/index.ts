import { Router } from 'express';
import TeamRouter from './teams.routes';

const router = Router();

router.use('/teams', TeamRouter);

export default router;
