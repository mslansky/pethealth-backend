'use strict';

require('dotenv').config();

module.exports = {
  'validateChecksums': false,
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': process.env.DATABASE_URL || 'postgres://jnpwbanmmwliso:6521767be59555d11acb2eaf22dce44a19ec0553f1cd93af6206205dcda5e8cb@ec2-23-20-168-40.compute-1.amazonaws.com:5432/deunlv5nldur02',
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || '5432a9d2-f030-4d76-b8df-1409026e4b54',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://jnpwbanmmwliso:6521767be59555d11acb2eaf22dce44a19ec0553f1cd93af6206205dcda5e8cb@ec2-23-20-168-40.compute-1.amazonaws.com:5432/deunlv5nldur02',
};


