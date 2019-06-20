const User = require('./user');
const Stock = require('./stock');
const Line = require('./line');

User.belongsToMany(Stock, { through: 'line' });

User.prototype.buyStock = async function(stock, price, amountBought = 1) {
   
  const line = await Line.findOrCreate({
    where: {
      userId: this.id,
      stockName: stock.name
    },
    defaults: {
      quantity: amountBought
    }
  });
  if (!line[1]) await line[0].update({
      quantity: line[0].quantity + amountBought
  });
  await this.update({ balance: this.balance - (price * amountBought) });
  return this.getStocks({ attributes: ['name'] });
};

module.exports = {
  User,
  Stock,
  Line
};
