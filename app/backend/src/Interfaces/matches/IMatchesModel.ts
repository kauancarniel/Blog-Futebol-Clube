import { IMatch } from './IMatches';

export type matchType = {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean
};

export interface IMatchModel {
  findAll() : Promise<IMatch[]>
  findAllInProgress() : Promise<IMatch[]>
  findAllFinished() : Promise<IMatch[]>
  finishMatch(id: number) : Promise<void>
  updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) : Promise<void>
  newMatch(matchInfos: matchType) : Promise<IMatch>
}
