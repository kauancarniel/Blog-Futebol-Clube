import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAll(): Promise<IMatch[]> {
    const data = await this.matchModel.findAll();
    return data;
  }
}
