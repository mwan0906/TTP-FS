const router = require('express').Router();
const axios = require('axios');

const token = process.env.AUTH_KEY || 'pk_74f80da970354efc96f5fab77c41d7fc';

router.get('/:tickerId', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${
        req.params.tickerId
      }/quote?token=${token}`
    );
    res.send({
        name: data.companyName,
        open: data.open.toFixed(2),
        price: data.latestPrice.toFixed(2)
    });
  } catch (err) {
    console.log(err);
    res.send('Ticker not found!');
  }
});

module.exports = router;
