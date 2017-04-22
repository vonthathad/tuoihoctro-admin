import { getGame, postGame, putGame, deleteGame } from '../../utils/GamesApis';
const LOAD = 'game/LOAD';
const LOAD_SUCCESS = 'game/LOAD_SUCCESS';
const LOAD_FAIL = 'game/LOAD_FAIL';
const CREATE = 'game/CREATE';
const CREATE_SUCCESS = 'game/CREATE_SUCCESS';
const CREATE_FAIL = 'game/CREATE_FAIL';
const EDIT = 'game/EDIT';
const EDIT_SUCCESS = 'game/EDIT_SUCCESS';
const EDIT_FAIL = 'game/EDIT_FAIL';
const DELETE = 'game/DELETE';
const DELETE_SUCCESS = 'game/DELETE_SUCCESS';
const DELETE_FAIL = 'game/DELETE_FAIL';
const initialState = {
  loaded: false,
  game: [],
  error: '',
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        game: null,
        loading: true,
        error: '',
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        game: action.payload,
        loading: false,
        error: '',
      };
    case LOAD_FAIL:
      return {
        ...state,
        game: null,
        loading: false,
        error: action.error,
      };
    case CREATE:
      return {
        ...state,
        // game: null,
        // loading: true,
        error: '',
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        // game: action.payload,
        // loading: false,
        error: '',
      };
    case CREATE_FAIL:
      return {
        ...state,
        // game: null,
        // loading: false,
        error: action.error,
      };
    case EDIT:
      return {
        ...state,
        // game: null,
        // loading: true,
        error: '',
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        // game: action.payload,
        // loading: false,
        error: '',
      };
    case EDIT_FAIL:
      return {
        ...state,
        // game: null,
        // loading: false,
        error: action.error,
      };
    case DELETE:
      return {
        ...state,
        // game: null,
        // loading: true,
        error: '',
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        // game: action.payload,
        // loading: false,
        error: '',
      };
    case DELETE_FAIL:
      return {
        ...state,
        // game: null,
        // loading: false,
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
function create() {
  return {
    type: CREATE,
  };
}
function createSuccess(payload) {
  return {
    type: CREATE_SUCCESS,
    payload,
  };
}
function createFail(error) {
  return {
    type: CREATE_FAIL,
    error,
  };
}
function edit() {
  return {
    type: EDIT,
  };
}
function editSuccess(payload) {
  return {
    type: EDIT_SUCCESS,
    payload,
  };
}
function editFail(error) {
  return {
    type: EDIT_FAIL,
    error,
  };
}
function _delete() {
  return {
    type: DELETE,
  };
}
function deleteSuccess(payload) {
  return {
    type: DELETE_SUCCESS,
    payload,
  };
}
function deleteFail(error) {
  return {
    type: DELETE_FAIL,
    error,
  };
}
export function loadGame(id) {
  return (dispatch) => {
    dispatch(load());
    return getGame(id)
    .then(payload => {
      dispatch(loadSuccess(payload));
    })
    .catch(error => {
      dispatch(loadFail(error));
    });
  };
}
export function createGame(input) {
  return (dispatch) => {
    dispatch(create());
    return postGame(input)
    .then(payload => {
      dispatch(createSuccess(payload));
    })
    .catch(error => {
      dispatch(createFail(error));
    });
  };
}
export function editGame(id, input) {
  return (dispatch) => {
    dispatch(edit());
    return putGame(id, input)
    .then(payload => {
      dispatch(editSuccess(payload));
    })
    .catch(error => {
      dispatch(editFail(error));
    });
  };
}

export function removeGame(id) {
  return (dispatch) => {
    dispatch(_delete());
    return deleteGame(id)
    .then(payload => {
      dispatch(deleteSuccess(payload));
    })
    .catch(error => {
      dispatch(deleteFail(error));
    });
  };
}
