const router = require('express').Router();
const { User } = require('../db/models');

const userNotFound = next => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !user.correctPassword(req.body.password)) {
      res.status(401).send('No such user found');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res, next) => {
  if (!req.session.passport.user) {
    userNotFound(next);
  } else {
    User.findByPk(req.session.passport.user)
      .then(user => (user ? res.json(user) : userNotFound(next)))
      .catch(next);
  }
});

module.exports = router;
