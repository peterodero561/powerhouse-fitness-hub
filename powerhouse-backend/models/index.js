const Sequelize = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: false
    }
);

const db = {
    Sequelize,
    sequelize,
    Event: require('./event.model')(sequelize, Sequelize),
    Review: require('./review.model')(sequelize, Sequelize),
    Plan: require('./plan.model')(sequelize, Sequelize)
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate){
        db[modelName].associate(db);
    }
});

module.exports = db;