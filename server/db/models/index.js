const User = require('./user');
const Stock = require('./stock');
const Line = require('./line');

User.belongsToMany(Stock, { through: 'line' });

User.prototype.buyStock = async function(stock, price, amountBought = 1) {
  console.log('buying', amountBought, 'at', price);
  await Promise.all([
    Line.findOrCreate({
      where: {
        userId: this.id,
        stockName: stock.name
      },
      defaults: {
        quantity: amountBought
      }
    }).then(line => {
      if (!line[1])
        return line[0].update({
          quantity: line[0].quantity + amountBought
        });
    }),
    this.update({ balance: this.balance - price * amountBought })
  ]);

  return this.getStocks({ attributes: ['name'] });
};

module.exports = {
  User,
  Stock,
  Line
};
