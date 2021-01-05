'use strict';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const { API_TOKEN } = require('../src/config');

describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/api/diaries/pet/Bento')
      .set({ 'Authorization': `Bearer ${API_TOKEN}` })
      .expect(200);
  });
});

describe('Unauthorized Access', () => {
  it('should return a 401 Error from any endpoint', () => {
    return supertest(app)
      .get('/api/diaries/pet/Bento')
      .expect(401);
  });
});