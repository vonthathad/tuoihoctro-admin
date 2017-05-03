import { getPosts, countPosts } from '../../utils/PostApi';
const LOAD = 'posts/LOAD';
const LOAD_SUCCESS = 'posts/LOAD_SUCCESS';
const LOAD_FAIL = 'posts/LOAD_FAIL';
const COUNT = 'posts/COUNT';
const COUNT_SUCCESS = 'posts/COUNT_SUCCESS';
const COUNT_FAIL = 'posts/COUNT_FAIL';
const initialState = {
  processing: false,
  posts: [],
  error: '',
  count: 0,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        posts: [],
        processing: true,
        error: '',
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        posts: action.payload.data,
        processing: false,
        error: '',
      };
    case LOAD_FAIL:
      return {
        ...state,
        posts: [],
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
export function loadPosts(query) {
  return (dispatch) => {
    dispatch(load());
    return getPosts(query)
    .then(payload => {
      // console.log(payload);
      dispatch(loadSuccess(payload));
    })
    .catch(error => {
      dispatch(loadFail(error));
    });
  };
}
export function _countPosts() {
  return (dispatch) => {
    dispatch(count());
    return countPosts()
    .then(payload => {
      // console.log(payload);
      dispatch(countSuccess(payload));
    })
    .catch(error => {
      dispatch(countFail(error));
    });
  };
}
