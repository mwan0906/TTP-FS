import axios from 'axios';

const defaultStocks = [];

const GET_PRICES = 'GET_PRICES';

const setPrices = prices => ({
  type: GET_PRICES,
  prices
});

export const getPrices = type => async (dispatch, getState) => {
  const { user } = getState();
  const { data } = await axios.get(`/api/user/${user.id}`);
  /*     const stocks = data.stocks.map(async stock => {
        axios.get(`/api/price/${stock.name}`)
        .then( ({data}) => console.log(data) )
    }); */
  const stocks = await Promise.all(
    data.stocks.map(stock =>
      axios.get(`/api/price/${stock.name}`).then(({ data }) => {
        const line = {
          name: stock.name,
          quantity: stock.line.quantity,
          price: (type === 'portfolio'
            ? stock.line.quantity * data.price
            : data.price
          ).toFixed(2),
          increased: data.price > data.open
        };
        return line;
      })
    )
  );
  dispatch(setPrices(stocks));
};

export default function(state = defaultStocks, action) {
  switch (action.type) {
    case GET_PRICES:
      return action.prices;
    default:
      return state;
  }
}
