import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { IMatchModel } from '../Interfaces/matches/IMatchesModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import LeadUtils from '../utils/leaderboardUtils';
// import { IMatch } from '../Interfaces/matches/IMatches';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async leaderboard() : Promise<ILeaderboard[]> {
    const teams = await this.teamModel.findAll();
    const matchs = await this.matchModel.findAllFinished();
    const retorno : ILeaderboard[] = [] as unknown as ILeaderboard[];
    teams.forEach((team) => {
      const leadUtils = new LeadUtils();
      const infos = leadUtils.getInfos(matchs, team.id);
      retorno.push({
        name: team.teamName,
        totalPoints: infos.points,
        totalGames: infos.games,
        totalVictories: infos.victories,
        totalDraws: infos.draws,
        totalLosses: (infos.games - infos.victories - infos.draws),
        goalsFavor: infos.homeGoals,
        goalsOwn: infos.awayGoals,
      });
    });

    return retorno as ILeaderboard[];
  }
}
