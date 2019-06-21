import axios from 'axios';

const defaultStocks = [];

const GET_PRICES = 'GET_PRICES';

const setPrices = prices => ({
  type: GET_PRICES,
  prices
});

export const getPortfolio = type => async (dispatch, getState) => {
  // choosing to refetch the data frequently
  // because it's my understanding that stock trading relies on minute to minute information
  const { user } = getState();
  const { data } = await axios.get(`/api/user/${user.id}`);

  const stocks = await Promise.all(
    data.map(line =>
      axios.get(`/api/price/${line.stockName}`).then(({ data }) => ({
        name: line.stockName,
        quantity: line.quantity,
        price: (line.quantity * data.price).toFixed(2),
        didIncrease:
          data.price > data.open
            ? 'up'
            : data.price === data.open
            ? 'equal'
            : 'down'
      }))
    )
  );
  dispatch(setPrices(stocks));
};

export const getTransactions = () => async (dispatch, getState) => {
  const { user } = getState();
  const { data } = await axios.get(`/api/user/${user.id}/lines`);
  dispatch(setPrices(data));
};

export default function(state = defaultStocks, action) {
  switch (action.type) {
    case GET_PRICES:
      return action.prices;
    default:
      return state;
  }
}
