import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatches';
import LeadUtils from '../utils/leaderboardUtils';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockLeaderboards = {
  name: 'Santos',
  totalPoints: 9,
  totalGames: 3,
  totalVictories: 3,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 9,
  goalsOwn: 3,
  goalsBalance: 6,
  efficiency: 100.00
}

const mockMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
}

describe('Leaderboards tests', function() {
  it('findAllHome', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([mockLeaderboards] as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([mockLeaderboards]);
  })
  it('findAllAway', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([mockLeaderboards] as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([mockLeaderboards]);
  })
  it('test utils', async function () {
    const leadUtils = new LeadUtils();
    const result = leadUtils.getInfos([mockMatch], 1)

    expect(result.points).to.deep.equal(0);
  })
  it('test utils away', async function () {
    const leadUtils = new LeadUtils();
    const result = leadUtils.getInfosAway([mockMatch], 1)

    expect(result.points).to.deep.equal(0);
    expect(result.homeGoals).to.deep.equal(0);
  })

  afterEach(sinon.restore);
});
