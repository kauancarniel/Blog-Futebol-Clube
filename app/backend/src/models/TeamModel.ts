import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';
// import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data;
  }
}
