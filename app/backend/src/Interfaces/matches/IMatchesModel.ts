import { IMatch } from './IMatches';

export interface IMatchModel {
  findAll() : Promise<IMatch[]>
  findAllInProgress() : Promise<IMatch[]>
  findAllFinished() : Promise<IMatch[]>
  finishMatch(id: number) : Promise<void>
  updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) : Promise<void>
}
