import { postLogin, postRegister } from '../../utils/AdminApi';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
const initialState = {
  user: {},
  error: '',
  status: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {},
        error: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        error: '',
        status: 'success',
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: {},
        error: action.error,
      };
    case REGISTER:
      return {
        ...state,
        user: {},
        error: '',
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.message,
        error: '',
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: {},
        error: action.error,
      };
    default:
      return state;
  }
}
function login() {
  return {
    type: LOGIN,
  };
}
function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}
function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    error,
  };
}
function register() {
  return {
    type: REGISTER,
  };
}
function registerSuccess(payload) {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
}
function registerFail(error) {
  return {
    type: REGISTER_FAIL,
    error,
  };
}
export function _login(input) {
  return (dispatch) => {
    dispatch(login());
    return postLogin(input)
    .then(payload => {
      // alert('login_success');
      dispatch(loginSuccess(payload));
    })
    .catch(err => {
      console.log(err);
      dispatch(loginFail(err));
    });
  };
}
export function _register(input) {
  return (dispatch) => {
    dispatch(register());
    return postRegister(input)
    .then(payload => {
      dispatch(registerSuccess(payload));
    })
    .catch(err => {
      dispatch(registerFail(err));
    });
  };
}
