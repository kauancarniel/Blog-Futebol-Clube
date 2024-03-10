import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwOTk0MjU2OX0.iD9Z6UPHMKU0p7cWPWrmJc-glYTBtVtqlWrKerZ9Sco'

const mockMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: true,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
}

const progressFalse = {
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

const mockBodyNewMatch = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const mockTypeMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true
}

const mockInvalidTypeMatch = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 1,
  awayTeamGoals: 2,
  inProgress: true
}

describe('Match tests', function() {
  it('findAll matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([mockMatch] as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([mockMatch]);
  })
  it('findAll in progress', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([mockMatch] as any);

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: true });

    expect(status).to.equal(200);
    expect(body).to.deep.equal([mockMatch]);
  })
  it('findAll in finished', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves([progressFalse] as any);

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: false });

    expect(status).to.equal(200);
    expect(body).to.deep.equal([progressFalse]);
  })
  it('finish match', async function () {
    sinon.stub(SequelizeMatch, 'update').resolves();

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', token);

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished' })
  })
  it('update matches', async function () {
    sinon.stub(SequelizeMatch, 'update').resolves();

    const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', token);

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ message: 'Success' })
  })
  it('new matches success', async function () {
    sinon.stub(SequelizeMatch, 'create').resolves(mockTypeMatch as any);

    const { status, body } = await chai.request(app).post('/matches').set('Authorization', token).send(mockBodyNewMatch);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(mockTypeMatch);
  })
  it('new matches equal id', async function () {
    sinon.stub(SequelizeMatch, 'create').resolves();

    const { status, body } = await chai.request(app).post('/matches').set('Authorization', token).send(mockInvalidTypeMatch);

    expect(status).to.equal(422);
    expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })

  afterEach(sinon.restore);
});
