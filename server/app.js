const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const db = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });

const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'TTP-FS',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

db.sync(/* {force: true} */).then(() => sessionStore.sync()).then(() => {
  console.log('The database is synced!');
  app.listen(PORT, () =>
    console.log(`

      Listening on port ${PORT}
      http://localhost:${PORT}/

    `)
  );
});
