import { IMatch } from './IMatches';

export interface IMatchModel {
  findAll() : Promise<IMatch[]>
}
