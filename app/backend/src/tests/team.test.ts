import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeModel from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockTeam = { "id": 1, "teamName": "Avaí/Kindermann" };

describe('Team tests', function() {
  it('test findAll', async function() {
    sinon.stub(SequelizeModel, 'findAll').resolves([mockTeam] as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([mockTeam]);
  });

  it('test findById success', async function() {
    sinon.stub(SequelizeModel, 'findOne').resolves(mockTeam as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeam);
  });

  afterEach(sinon.restore);
});
