// models/index.js
const Sequelize = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Helper: if individual env vars are present, create a connection string safely
function buildDatabaseUrlFromEnv() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const user = process.env.DB_USER || dbConfig.username || 'postgres';
  const pass = process.env.DB_PASSWORD || dbConfig.password || '';
  const host = process.env.DB_HOST || dbConfig.host || '127.0.0.1';
  const port = process.env.DB_PORT || dbConfig.port || 5432;
  const database = process.env.DB_NAME || dbConfig.database || 'postgres';

  // encode password to avoid URI errors if it contains @ / : / etc
  const encodedPass = encodeURIComponent(pass);
  return `postgres://${user}:${encodedPass}@${host}:${port}/${database}`;
}

const connectionString = buildDatabaseUrlFromEnv();

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    // when using hosted Postgres like Supabase, require SSL
    ssl: process.env.DATABASE_URL ? { require: true, rejectUnauthorized: false } : false
  },
  logging: false
});

const db = {
  Sequelize,
  sequelize,
  Event: require('./event.model')(sequelize, Sequelize),
  Review: require('./review.model')(sequelize, Sequelize),
  Plan: require('./plan.model')(sequelize, Sequelize),
  Feature: require('./feature')(sequelize, Sequelize),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
