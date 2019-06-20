const User = require('./user');
const Stock = require('./stock');

User.belongsToMany(Stock, {through: 'user_stock'});

User.prototype.buyStock = async function(stock) {
    await this.addStock(stock);
    return this.getStocks({attributes: ['name']});
}

module.exports = {
    User,
    Stock
};