import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchesModel';
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
}
