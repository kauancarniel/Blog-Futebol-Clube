import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async leaderboard(_req: Request, res: Response) {
    const data = await this.leaderboardService.leaderboard();
    data.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      const goalDifferenceA = a.goalsFavor - a.goalsOwn;
      const goalDifferenceB = b.goalsFavor - b.goalsOwn;

      if (goalDifferenceB !== goalDifferenceA) {
        return goalDifferenceB - goalDifferenceA;
      }

      return b.goalsFavor - a.goalsFavor;
    });

    res.status(200).json(data);
  }

  public async leaderboardAway(_req: Request, res: Response) {
    const data = await this.leaderboardService.leaderboardAway();
    data.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      const goalDifA = a.goalsFavor - a.goalsOwn;
      const goalDifB = b.goalsFavor - b.goalsOwn;

      if (goalDifB !== goalDifA) {
        return goalDifB - goalDifA;
      }

      return b.goalsFavor - a.goalsFavor;
    });

    res.status(200).json(data);
  }
}
