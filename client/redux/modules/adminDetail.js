import { getAdmin, postAdmin, putAdmin, deleteAdmin } from '../../utils/AdminApi';
const LOAD = 'admin/LOAD';
const LOAD_SUCCESS = 'admin/LOAD_SUCCESS';
const LOAD_FAIL = 'admin/LOAD_FAIL';
const CREATE = 'admin/CREATE';
const CREATE_SUCCESS = 'admin/CREATE_SUCCESS';
const CREATE_FAIL = 'admin/CREATE_FAIL';
const EDIT = 'admin/EDIT';
const EDIT_SUCCESS = 'admin/EDIT_SUCCESS';
const EDIT_FAIL = 'admin/EDIT_FAIL';
const DELETE = 'admin/DELETE';
const DELETE_SUCCESS = 'admin/DELETE_SUCCESS';
const DELETE_FAIL = 'admin/DELETE_FAIL';
const TURN_OFF_ERROR = 'admin/TURN_OFF_ERROR';
const TURN_OFF_MESSAGE = 'admin/TURN_OFF_MESSAGE';
const initialState = {
  processing: false,
  error: '',
  message: '',
  data: {},
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        processing: true,
        error: '',
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        processing: false,
        error: '',
      };
    case LOAD_FAIL:
      return {
        ...state,
        processing: false,
        error: action.error,
      };
    case CREATE:
      return {
        ...state,
        processing: true,
        error: '',
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        data: action.payload.data,
        processing: false,
        error: '',
      };
    case CREATE_FAIL:
      return {
        ...state,
        processing: false,
        error: action.error,
      };
    case EDIT:
      return {
        ...state,
        processing: true,
        error: '',
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        processing: false,
        error: '',
      };
    case EDIT_FAIL:
      return {
        ...state,
        processing: false,
        error: action.error,
      };
    case DELETE:
      return {
        ...state,
        processing: true,
        error: '',
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        processing: false,
        error: '',
      };
    case DELETE_FAIL:
      return {
        ...state,
        processing: false,
        error: action.error,
      };
    case TURN_OFF_ERROR:
      return {
        ...state,
        error: '',
      };
    case TURN_OFF_MESSAGE:
      return {
        ...state,
        message: '',
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

export function turnOffError() {
  return (dispatch) => dispatch({ type: TURN_OFF_ERROR });
}
export function turnOffMessage() {
  return (dispatch) => dispatch({ type: TURN_OFF_MESSAGE });
}
export function loadAdmin(id) {
  return (dispatch) => {
    dispatch(load());
    return getAdmin(id)
    .then(payload => { console.log(payload); dispatch(loadSuccess(payload)); })
    .catch(error => { dispatch(loadFail(error)); });
  };
}
export function createAdmin(input) {
  return (dispatch) => {
    dispatch(create());
    return postAdmin(input)
    .then(payload => { dispatch(createSuccess(payload)); })
    .catch(error => { dispatch(createFail(error)); });
  };
}
export function editAdmin(id, input) {
  return (dispatch) => {
    dispatch(edit());
    return putAdmin(id, input)
    .then(payload => { dispatch(editSuccess(payload)); })
    .catch(error => { dispatch(editFail(error)); });
  };
}

export function removeAdmin(id) {
  return (dispatch) => {
    dispatch(_delete());
    return deleteAdmin(id)
    .then(payload => { dispatch(deleteSuccess(payload)); })
    .catch(error => { dispatch(deleteFail(error)); });
  };
}
