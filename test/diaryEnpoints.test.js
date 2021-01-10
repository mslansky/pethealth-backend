'use strict';
const { expect } = require('chai');
const { default: contentSecurityPolicy } = require('helmet/dist/middlewares/content-security-policy');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { createPetDiaries } = require('./fixtures');
const { API_TOKEN } = require('../src/config');

describe('Diaries Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });
  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('diaries').truncate());

  afterEach('cleanup', () => db('diaries').truncate());

  describe('GET /api/diaries', () => {
    context('Given no diaries', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/diaries/pet/Oliver')
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200, []);
      });
    });
    context('Given there are diaries in the database', () => {
      const testDiaries = createPetDiaries();

      beforeEach('insert diaries', () => {
        return db.into('diaries').insert(testDiaries);
      });
      it('responds with 200 and all of the Oliver diaries', () => {
        return supertest(app)
          .get('/api/diaries/pet/Oliver')
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200, testDiaries.filter(x => x.name === 'Oliver'));
      });
    });
  });

  describe('GET /api/diaries/:diaryid', () => {
    context('Given no diaries', () => {
      it('responds with empty array', () => {
        const diaryId = 123456;
        return supertest(app)
          .get(`/api/diaries/${diaryId}`)
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200, []);
      });
    });
    context('Given there are diaries in the database', () => {
      const testDiaries = createPetDiaries();

      beforeEach('insert diaries', () => {
        return db.into('diaries').insert(testDiaries);
      });

      it('responds with 200 and the specified diary', () => {
        const diaryId = 30;
        const expectedDiary = testDiaries[2];
        return supertest(app)
          .get(`/api/diaries/${diaryId}`)
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200, [expectedDiary]);
      });
    });
  });
  describe('POST /diaries/:diary_id', () => {
    context('Given there are diaries in the database', () => {
      const testDiaries = createPetDiaries();

      beforeEach('insert diaries', () => {
        return db.into('diaries').insert(testDiaries);
      });

      it('updates a diary, responding with 200 and the new diary', function () {
        const newDiary = {
          'id': 30,
          'name': 'Oliver',
          'diarydate': '2021-01-12',
          'medication': null,
          'weight': null,
          'diet': null,
          'allergies': null,
          'body': null,
          'other': null
        };
        return supertest(app)
          .post('/api/diaries/30')
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .send(newDiary)
          .expect(200)
          .expect((res) => {
            console.log(res.body);
            console.log(newDiary.name);
            expect(res.body.name).to.eql(newDiary.name);
            expect(res.body.diarydate).to.eql(newDiary.diarydate);
            expect(res.body.medication).to.eql(newDiary.medication);
          })
          .then((res) =>
            supertest(app)
              .get(`/api/diaries/${res.body.id}`)
              .set({ 'Authorization': `Bearer ${API_TOKEN}` })
              .expect([res.body])
          );
      });
    });
  });

  describe('POST /diaries/', () => {
    it('creates a diary, responding with 200 and the new diary', function () {
      const newDiary = {
        'name': 'Oliver',
        'diarydate': '2021-01-12',
        'medication': 'Trifexis',
        'weight': null,
        'diet': null,
        'allergies': null,
        'body': null,
        'other': null
      };
      return supertest(app)
        .post('/api/diaries')
        .set({ 'Authorization': `Bearer ${API_TOKEN}` })
        .send(newDiary)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).to.eql(newDiary.name);
          expect(res.body.diarydate).to.eql(newDiary.diarydate);
          expect(res.body).to.have.property('id');
        })
        .then((res) =>
          supertest(app)
            .get(`/api/diaries/${res.body.id}`)
            .set({ 'Authorization': `Bearer ${API_TOKEN}` })
            .expect([res.body])
        );
    });
  });

  describe('DELETE /diaries/:diary_id', () => {
    context('Given there are recipes in the database', () => {
      const testDiaries = createPetDiaries();

      beforeEach('insert diaries', () => {
        return db
          .into('diaries')
          .insert(testDiaries);
      });

      it('responds with 200 and removes the diary', () => {
        const testId = 1;
        return supertest(app)
          .delete(`/api/diaries/${testId}`)
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200);
      });
    });
  });
});