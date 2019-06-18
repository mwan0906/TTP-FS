import axios from 'axios'

const defaultUser = {}

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const getUser = user =>
  ({
    type: GET_USER,
    user
  });
export const removeUser = () =>
  ({
    type: REMOVE_USER
  });

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
};

export const auth = (
  email,
  password,
  name
) => async dispatch => {
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
    return dispatch(getUser({error: err}));
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
    console.error(err)
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  };
};
