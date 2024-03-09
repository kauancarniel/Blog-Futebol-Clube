import MatchModel from '../models/MatchModel';
import { IMatchModel, matchType } from '../Interfaces/matches/IMatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAll(progress : string): Promise<IMatch[]> {
    if (progress === 'true') {
      const data = await this.matchModel.findAllInProgress();
      return data;
    }
    if (progress === 'false') {
      const data = await this.matchModel.findAllFinished();
      return data;
    }
    const data = await this.matchModel.findAll();
    return data;
  }

  public async finishMatch(id: number) : Promise<void> {
    await this.matchModel.finishMatch(id);
  }

  public async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number)
    : Promise<void> {
    await this.matchModel.updateMatch(homeTeamGoals, awayTeamGoals, id);
  }

  async newMatch(matchInfos : matchType) : Promise<IMatch> {
    const match = await this.matchModel.newMatch(matchInfos);
    return match;
  }
}
