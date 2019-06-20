const Sequelize = require('sequelize');
const db = require('../db');

const Line = db.define('line', {
  quantity: {
    type: Sequelize.INTEGER,
    min: 0,
    default: 1
  }
});

module.exports = Line;