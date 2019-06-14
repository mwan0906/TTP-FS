const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.listen(PORT, () =>
  console.log(`
      Listening on port ${PORT}
      http://localhost:3000/
    `)
);
