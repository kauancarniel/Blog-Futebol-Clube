import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ITeam[]> {
    const data = await this.teamModel.findAll();
    return data;
  }

  public async findById(id: number): Promise<ITeam | null> {
    const data = await this.teamModel.findById(id);
    return data;
  }
}
