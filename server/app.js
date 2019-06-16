const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./db')

const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use('/auth', require('./auth'));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'))
})


db.sync({force: true})
  .then(() => {
    console.log('The database is synced!')
    app.listen(PORT, () => console.log(`

      Listening on port ${PORT}
      http://localhost:${PORT}/

    `))
  })
