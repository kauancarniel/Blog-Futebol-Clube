import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
    private teamService = new TeamService(),
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

  public async updateMatch(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    await this.matchService.updateMatch(homeTeamGoals, awayTeamGoals, Number(id));

    res.status(200).json({ message: 'Success' });
  }

  public async newMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const teamHome = await this.teamService.findById(Number(homeTeamId));
    const teamAway = await this.teamService.findById(Number(awayTeamId));

    if (!teamHome || !teamAway) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const match = await this.matchService.newMatch(
      { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true },
    );

    res.status(201).json(match);
  }
}
