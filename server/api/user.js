const router = require('express').Router();
const { User, Stock } = require('../db/models');

router.get('/:userId', (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => user.getStocks({attributes: ['name']}))
    .then(stocks => res.send(stocks));
});

router.post('/:userId', (req, res, next) => {
  Promise.all([
    User.findByPk(req.params.userId),
    Stock.findOrCreate({
      where: { name: req.body.ticker }
    })
  ])
  .then( ([user, stock]) => user.buyStock(stock[0]))
  .then(stocks => res.send(stocks));
});

module.exports = router;
