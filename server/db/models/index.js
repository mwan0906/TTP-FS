const User = require('./user');
const Stock = require('./stock');
const Line = require('./line');
const Sequelize = require('sequelize');

User.hasMany(Line);
Stock.hasMany(Line);

User.prototype.individualLines = async function() {
  return await this.getLines({
    attributes: ['stockName', 'boughtPrice', 'quantity'],
    order: [['createdAt', 'DESC']]
  });
};

User.prototype.allLines = async function() {
  return await this.getLines({
    attributes: ['stockName', [Sequelize.fn('sum', Sequelize.col('quantity')), 'quantity']],
    group: ['stockName']
  });
};

User.prototype.buyStock = async function(stock, price, amountBought = 1) {
  await Promise.all([
    Line.create({
      userId: this.id,
      stockName: stock.name,
      quantity: amountBought,
      boughtPrice: price
    }),
    this.update({ balance: this.balance - price * amountBought })
  ]);

  return this.allLines();
};

module.exports = {
  User,
  Stock,
  Line
};
