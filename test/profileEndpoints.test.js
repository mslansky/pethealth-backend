'use strict';
const { expect } = require('chai');
const { default: contentSecurityPolicy } = require('helmet/dist/middlewares/content-security-policy');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { createProfiles } = require('./fixtures');
const { API_TOKEN } = require('../src/config');

describe('Profiles Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });
  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('profiles').truncate());

  afterEach('cleanup', () => db('profiles').truncate());

  describe('GET /api/profiles', () => {
    context('Given no profiles', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/profiles')
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200, []);
      });
    });
    context('Given there are profiles in the database', () => {
      const testProfiles = createProfiles();

      beforeEach('insert profiles', () => {
        return db.into('profiles').insert(testProfiles);
      });
      it('responds with 200 and all of the Pet Profiles', () => {
        return supertest(app)
          .get('/api/profiles')
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200, testProfiles);
      });
    });
  });

  describe('POST /profiles/', () => {
    it('creates a profile, responding with 200 and the new profile', function () {
      const newProfile = {
        'id': 100,
        'name': 'Madison' };
      return supertest(app)
        .post('/api/profiles')
        .set({ 'Authorization': `Bearer ${API_TOKEN}` })
        .send(newProfile)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).to.eql(newProfile.name);
          expect(res.body).to.have.property('id');
        })
        .then((res) =>
          supertest(app)
            .get(`/api/profiles/${res.body.id}`)
            .set({ 'Authorization': `Bearer ${API_TOKEN}` })
            .expect({})
        );
    });
  });

  describe('DELETE /profiles/:profilesid', () => {
    context('Given there are profiles in the database', () => {
      const testProfiles = createProfiles();

      beforeEach('insert profiles', () => {
        return db
          .into('profiles')
          .insert(testProfiles);
      });

      it('responds with 200 and removes the Profile', () => {
        const testId = 1;
        return supertest(app)
          .delete(`/api/profiles/${testId}`)
          .set({ 'Authorization': `Bearer ${API_TOKEN}` })
          .expect(200);
      });
    });
  });
});