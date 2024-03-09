import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const data = await this.matchService.findAll(inProgress as string);
    res.status(200).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchService.finishMatch(Number(id));

    res.status(200).json({ message: 'Finished' });
  }
}
