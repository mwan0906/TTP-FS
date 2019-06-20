const router = require('express').Router();
const { User, Stock } = require('../db/models');

const userGateway = (req, res, next) => {
  if (req.params.userId != req.session.passport.user) res.send('Forbidden');
  else next();
}

router.get('/:userId', userGateway, (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => user.getStocks({attributes: ['name']}))
    .then(stocks => res.send(stocks));
});

router.post('/:userId', userGateway, async (req, res, next) => {
  Promise.all([
    User.findByPk(req.params.userId),
    Stock.findOrCreate({
      where: { name: req.body.ticker }
    })
  ])
  .then( ([user, stock]) => user.buyStock(stock[0], req.body.price, req.body.amount))
  .then(stocks => res.send(stocks));
});

module.exports = router;
