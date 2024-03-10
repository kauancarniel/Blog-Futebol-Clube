import { IMatch } from '../Interfaces/matches/IMatches';

type IData = {
  points: number
  games: number
  victories: number
  draws: number
  homeGoals: number
  awayGoals: number
};

export default class LeadUtils {
  public homePoints: number;
  public games: number;
  public victories: number;
  public draws: number;
  public homeGoals: number;
  public awayGoals: number;
  public data : IData;
  constructor() {
    this.homePoints = 0; this.games = 0; this.victories = 0; this.draws = 0;
    this.homeGoals = 0; this.awayGoals = 0; this.data = {} as IData;
  }

  public getInfos(matches : IMatch[], id: number) : IData {
    matches.forEach((match) => {
      if (match.homeTeamId === id) {
        if (match.homeTeamGoals === match.awayTeamGoals) this.homePoints += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) this.draws += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) this.homePoints += 3;
        if (match.homeTeamGoals > match.awayTeamGoals) this.victories += 1;
        this.games += 1;
        this.homeGoals += match.homeTeamGoals;
        this.awayGoals += match.awayTeamGoals;
      } this.data = { points: this.homePoints,
        games: this.games,
        victories: this.victories,
        draws: this.draws,
        homeGoals: this.homeGoals,
        awayGoals: this.awayGoals };
    });
    return this.data;
  }
}
