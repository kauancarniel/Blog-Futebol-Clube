import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.findAll();
    res.status(200).json({ serviceResponse });
  }
}
