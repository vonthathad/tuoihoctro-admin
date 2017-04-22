import { getGames } from '../../utils/GamesApis';
const LOAD = 'games/LOAD';
const LOAD_SUCCESS = 'games/LOAD_SUCCESS';
const LOAD_FAIL = 'games/LOAD_FAIL';
const initialState = {
  loaded: false,
  games: [],
  error: '',
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        games: [],
        loading: true,
        error: '',
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        games: action.payload,
        loading: false,
        error: '',
      };
    case LOAD_FAIL:
      return {
        ...state,
        games: [],
        loading: false,
        error: action.error,
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
export function loadGames(query) {
  return (dispatch) => {
    dispatch(load());
    return getGames(query)
    .then(payload => {
      dispatch(loadSuccess(payload));
    })
    .catch(error => {
      dispatch(loadFail(error));
    });
  };
}
