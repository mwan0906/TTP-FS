const router = require('express').Router();
const { User, Stock, Line } = require('../db/models');

const userGateway = (req, res, next) => {
  if (req.params.userId != req.session.passport.user) res.send('Forbidden');
  else next();
}

router.get('/:userId', userGateway, async (req, res, next) => {
  User.findByPk(req.params.userId, {
    include: [{
      model: Stock,
      attributes: ['name'],
      through: {
        attributes: ['quantity']
      }
    }]
  })
  .then( stocks => res.send(stocks) );
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
