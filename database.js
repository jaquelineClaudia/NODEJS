const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '123',
  database: 'ComputersRepairsE1',
  logging: false,
});

module.exports = { db };
