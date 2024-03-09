import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockUserInfos = { id: 1, username: 'name', role: 'role', email: 'email@email.com', password: 'secret_admin' }

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwOTk0MjU2OX0.iD9Z6UPHMKU0p7cWPWrmJc-glYTBtVtqlWrKerZ9Sco'

const mockUserCred = { email: 'admin@admin.com', password: 'secret_admin' }

describe('User tests', function() {
  it('login sem email', async function () {
    const req = await chai.request(app).post('/login').send({ email: '', password: 'secret_admin' })

    expect(req.status).to.equal(400);
    expect(req.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })
  it('login sem password', async function () {
    const req = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: '' })

    expect(req.status).to.equal(400);
    expect(req.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })
  it('user não encontrado', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
  
    const req = await chai.request(app).post('/login').send({ email: 'email@email.com', password: 'senha' });
  
    expect(req.status).to.equal(401);
    expect(req.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })
  it('invalid password', async function () {
    const mockReturn = SequelizeUser.build(mockUserInfos);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockReturn);
  
    const req = await chai.request(app).post('/login').send({ email: 'email@email.com', password: 'invalidpassword' });
  
    expect(req.status).to.equal(401);
    expect(req.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })
  it('invalid email', async function () {
    const req = await chai.request(app).post('/login').send({ email: 'email', password: 'pass' })

    expect(req.status).to.equal(401);
    expect(req.body).to.be.deep.equal({ message: 'Invalid email or password' })
  })
  it('login/role', async function () {
    const req = await chai.request(app).get('/login/role').set('Authorization', token);

    expect(req.status).to.equal(200);
    expect(req.body).to.have.key('role');
  })
  it('login/role sem token', async function () {
    const req = await chai.request(app).get('/login/role');

    expect(req.status).to.equal(401);
    expect(req.body).to.be.deep.equal({ message: 'Token not found' })
  })

  afterEach(sinon.restore);
});
