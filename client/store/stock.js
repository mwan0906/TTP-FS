import axios from 'axios';

const defaultStocks = [];

const GET_PRICES = 'GET_PRICES';

const setPrices = prices => ({
  type: GET_PRICES,
  prices
});

export const getPrices = type => async (dispatch, getState) => {
  // choosing to refetch the data frequently
  // (whenever the user switches from portfolio to transaction or vice versa)
  // because it's my understanding that stock trading relies on minute to minute information
  const { user } = getState();
  const { data } = await axios.get(`/api/user/${user.id}`);

  const stocks = await Promise.all(
    data.stocks.map(stock =>
      axios.get(`/api/price/${stock.name}`).then(({ data }) => {
        const line = {
          name: stock.name,
          quantity: stock.line.quantity,
          price: type === 'portfolio'
            ? (stock.line.quantity * data.price).toFixed(2)
            : data.price,
          didIncrease: data.price > data.open ? 'up' : data.price === data.open ? 'equal' : 'down'
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
