import { getAdmins, countAdmins } from '../../utils/AdminApi';
const LOAD = 'admins/LOAD';
const LOAD_SUCCESS = 'admins/LOAD_SUCCESS';
const LOAD_FAIL = 'admins/LOAD_FAIL';
const COUNT = 'admins/COUNT';
const COUNT_SUCCESS = 'admins/COUNT_SUCCESS';
const COUNT_FAIL = 'admins/COUNT_FAIL';
const ERROR_REMOVE = 'admins/ERROR_REMOVE';
const initialState = {
  processing: false,
  admins: [],
  error: '',
  count: 0,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        admins: [],
        processing: true,
        error: '',
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        admins: action.payload.data,
        processing: false,
        error: '',
      };
    case LOAD_FAIL:
      return {
        ...state,
        admins: [],
        processing: false,
        error: action.error,
      };
    case COUNT:
      return {
        ...state,
        count: 0,
      };
    case COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.data,
      };
    case COUNT_FAIL:
      return {
        ...state,
        count: 0,
      };
    case ERROR_REMOVE:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
}

function load() {
  return {
    type: LOAD,
  };
}
function loadSuccess(payload) {
  return {
    type: LOAD_SUCCESS,
    payload,
  };
}
function loadFail(error) {
  return {
    type: LOAD_FAIL,
    error,
  };
}
function count() {
  return {
    type: COUNT,
  };
}
function countSuccess(payload) {
  return {
    type: COUNT_SUCCESS,
    payload,
  };
}
function countFail(error) {
  return {
    type: COUNT_FAIL,
    error,
  };
}
function removeError() {
  return {
    type: ERROR_REMOVE,
  };
}
export function loadAdmins(query) {
  return (dispatch) => {
    dispatch(load());
    return getAdmins(query)
    .then(payload => {
      dispatch(loadSuccess(payload));
    })
    .catch(error => {
      dispatch(loadFail(error));
    });
  };
}
export function _countAdmins() {
  return (dispatch) => {
    dispatch(count());
    return countAdmins()
    .then(payload => {
      // console.log(payload);
      dispatch(countSuccess(payload));
    })
    .catch(error => {
      dispatch(countFail(error));
    });
  };
}
export function _removeError() {
  return (dispatch) => {
    dispatch(removeError());
  };
}
