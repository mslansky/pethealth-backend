'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const validateBearerToken = require('./validate-bearer-token');
const errorHandler = require('./error-handler');
const profileRouter = require('./profile/profileRouter');
const diaryRouter = require('./diary/diaryRouter');
const bodyParser = express.json();
const { DATABASE_URL } = require('./config');
const knex = require('knex');


const app = express();


const knexInstance = knex({
  client: 'pg',
  connection: DATABASE_URL,
});


app.set('db', knexInstance);
console.log(DATABASE_URL);

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}));

app.use(cors());
app.use(helmet());
app.use(validateBearerToken);

app.use(bodyParser);

app.use('/api/profiles', profileRouter);
app.use('/api/diaries', diaryRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorHandler);

module.exports = app;