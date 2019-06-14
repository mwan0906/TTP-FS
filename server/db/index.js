const Sequelize = require('sequelize')

const client = new Sequelize('postgres://localhost:5432/TTP-FS', {
  logging: false
});

module.exports = client;