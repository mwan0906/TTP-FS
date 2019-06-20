const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true
  }
}); // not keeping track of price in here because we'll be pulling that from the API every time

module.exports = Stock;
