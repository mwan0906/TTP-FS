import axios from 'axios';
import { getPrices } from './stock';

const defaultUser = {};

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const CLEAR_ERROR = 'CLEAR_ERROR';
const BUY_STOCK = 'BUY_STOCK';

const getUser = user => ({
  type: GET_USER,
  user
});
const removeUser = () => ({
  type: REMOVE_USER
});
export const clearError = () => ({
  type: CLEAR_ERROR
});
const buyStock = amountSpent => ({
  type: BUY_STOCK,
  amountSpent
});

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, name) => async dispatch => {
  let res;
  try {
    if (name) {
      res = await axios.post(`/auth/signup`, {
        email,
        password,
        name
      });
    } else {
      res = await axios.post(`/auth/login`, { email, password });
    }
  } catch (err) {
    return dispatch(getUser({ error: err }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const stockBuyer = (ticker, amount) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/price/${ticker}`);
    if (typeof data === 'string') throw data;
    const price = parseInt(data.price * 100);
    const { user } = getState();
    const { balance, id } = user;
    if (price * amount > balance) throw 'Not enough cash!';
    axios.post(`/api/user/${id}`, {
      ticker,
      price,
      amount
    }).then( () =>
    dispatch(getPrices('portfolio')) );
    dispatch(buyStock(price * amount));
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case CLEAR_ERROR:
      return { ...state, error: undefined };
    case BUY_STOCK:
      return { ...state, balance: state.balance - action.amountSpent };
    default:
      return state;
  }
}
