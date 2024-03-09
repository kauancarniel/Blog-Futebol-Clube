import { IMatch } from './IMatches';

export interface IMatchModel {
  findAll() : Promise<IMatch[]>
  findAllInProgress() : Promise<IMatch[]>
  findAllFinished() : Promise<IMatch[]>
}
