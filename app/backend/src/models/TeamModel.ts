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

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    if (data == null) return null;
    return data;
  }
}
