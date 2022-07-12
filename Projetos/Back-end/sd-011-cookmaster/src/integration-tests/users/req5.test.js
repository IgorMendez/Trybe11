const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../../api/app');

const { MongoClient } = require('mongodb');
const { getConnection } = require('../connection');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('Requisito 5 - Testa o endpoint para listagem de receitas por ID', () => {
  describe('quando a receita é encontrada com sucesso', () => {
    describe('a resposta', () => {
      const user = {
        name: 'igor',
        email: 'igor@gmail.com',
        password: '12345687'
      };

      const { name: _, ...loginInfo } = user;

      const recipe = {
        name: 'sextou',
        ingredients: 'breja e pinga',
        preparation: 'só beber',
      };

      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai.request(server).post('/login').send(loginInfo);
        const { body: { recipe: { _id } } } = await chai
          .request(server).post('/recipes').send(recipe).set({ authorization: token });
        response = await chai.request(server).get(`/recipes/${_id}`)
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 200', async () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
       expect(response.body).to.be.an('object');
      });

      it('o objeto possui as chaves "_id", "name", "ingredients", "preparation", "userId"', () => {
        expect(response.body).to.have.all.keys('name', 'ingredients', 'preparation', 'userId', '_id');
      });
    })
  });

  describe('quando a receita não é encontrada', () => {
    describe('a resposta', () => {
      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        response = await chai.request(server).get(`/619cae1d1179a513f6680ef4`)
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('retorna o status 404', () => {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('objeto contem a chave "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('"message" possui o valor "recipe not found"', () => {
        expect(response.body.message).to.be.equal('recipe not found');
      });
    });
  });

  describe('quando o ID é inválido', () => {
    describe('a resposta', () => {
      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        response = await chai.request(server).get(`/recipes/999`)
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('retorna o status 404', () => {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('objeto contem a chave "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('"message" possui o valor "recipe not found"', () => {
        expect(response.body.message).to.be.equal('recipe not found');
      });
    });
  });
});