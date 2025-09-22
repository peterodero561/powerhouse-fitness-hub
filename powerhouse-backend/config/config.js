const { use } = require('../routes/events');

// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    // If you have a full DATABASE_URL (recommended for Supabase), Sequelize will use it.
    // But we keep the old separate env vars as fallback for local Postgres dev.
    use_env_variable: process.env.DATABASE_URL ? 'DATABASE_URL' : undefined,
    username: process.env.DB_USER || 'dev',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'powerhousegym',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
