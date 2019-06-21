const router = require('express').Router();
const { User, Stock } = require('../db/models');

const userGateway = (req, res, next) => {
  if (req.params.userId != req.session.passport.user) res.send('Forbidden');
  else next();
}

router.get('/:userId/lines', userGateway, async (req, res, next) => {
  const user = await User.findByPk(req.params.userId);
  res.send( await user.individualLines());
});

router.get('/:userId', userGateway, async (req, res, next) => {
  const user = await User.findByPk(req.params.userId);
  res.send( await user.allLines());
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
