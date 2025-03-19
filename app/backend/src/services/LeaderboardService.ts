import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { IMatchModel } from '../Interfaces/matches/IMatchesModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ITeam } from '../Interfaces/teams/ITeams';
import LeadUtils from '../utils/leaderboardUtils';
// import { IMatch } from '../Interfaces/matches/IMatches';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel = new TeamModel(),
    public teams: ITeam[] = [],
  ) { this.func(); }

  public async func() : Promise<void> {
    this.teams = await this.teamModel.findAll();
  }

  public async leaderboard() : Promise<ILeaderboard[]> {
    const matchs = await this.matchModel.findAllFinished();
    const retorno : ILeaderboard[] = [] as unknown as ILeaderboard[];
    this.teams.forEach((team) => {
      const leadUtils = new LeadUtils();
      const infos = leadUtils.getInfos(matchs, team.id);
      retorno.push({ name: team.teamName,
        totalPoints: infos.points,
        totalGames: infos.games,
        totalVictories: infos.victories,
        totalDraws: infos.draws,
        totalLosses: (infos.games - infos.victories - infos.draws),
        goalsFavor: infos.homeGoals,
        goalsOwn: infos.awayGoals,
        goalsBalance: (infos.homeGoals - infos.awayGoals),
        efficiency: Number(((infos.points / (infos.games * 3)) * 100).toFixed(2)),
      });
    });

    return retorno as ILeaderboard[];
  }

  public async leaderboardAway() : Promise<ILeaderboard[]> {
    const matchs = await this.matchModel.findAllFinished();
    const retorno : ILeaderboard[] = [] as unknown as ILeaderboard[];
    this.teams.forEach((team) => {
      const leadUtils = new LeadUtils();
      const infos = leadUtils.getInfosAway(matchs, team.id);
      retorno.push({ name: team.teamName,
        totalPoints: infos.points,
        totalGames: infos.games,
        totalVictories: infos.victories,
        totalDraws: infos.draws,
        totalLosses: (infos.games - infos.victories - infos.draws),
        goalsFavor: infos.awayGoals,
        goalsOwn: infos.homeGoals,
        goalsBalance: (infos.awayGoals - infos.homeGoals),
        efficiency: Number(((infos.points / (infos.games * 3)) * 100).toFixed(2)),
      });
    });

    return retorno as ILeaderboard[];
  }

  public async leaderboarAll() : Promise<ILeaderboard[]> {
    const matchs = await this.matchModel.findAllFinished();
    const retorno : ILeaderboard[] = [] as unknown as ILeaderboard[];
    this.teams.forEach((team) => {
      const leadUtils = new LeadUtils();
      const infos = leadUtils.getInfosAway(matchs, team.id);
      retorno.push({ name: team.teamName,
        totalPoints: infos.points,
        totalGames: infos.games,
        totalVictories: infos.victories,
        totalDraws: infos.draws,
        totalLosses: (infos.games - infos.victories - infos.draws),
        goalsFavor: infos.awayGoals,
        goalsOwn: infos.homeGoals,
        goalsBalance: (infos.awayGoals - infos.homeGoals),
        efficiency: Number(((infos.points / (infos.games * 3)) * 100).toFixed(2)),
      });
    });

    return retorno as ILeaderboard[];
  }
}
