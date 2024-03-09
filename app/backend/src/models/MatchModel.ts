import SequelizeMatch from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatches';
import { IMatchModel, matchType } from '../Interfaces/matches/IMatchesModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return data;
  }

  async findAllInProgress(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      where: { inProgress: true },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return data;
  }

  async findAllFinished(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return data;
  }

  async finishMatch(id: number) : Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) : Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async newMatch(matchInfos : matchType) : Promise<IMatch> {
    const data = await this.model.create(matchInfos);
    return data;
  }
}
