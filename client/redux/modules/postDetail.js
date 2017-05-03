import { getPost, postPost, putPost, deletePost, postGif2mp4 } from '../../utils/PostApi';
const LOAD = 'post/LOAD';
const LOAD_SUCCESS = 'post/LOAD_SUCCESS';
const LOAD_FAIL = 'post/LOAD_FAIL';
const CREATE = 'post/CREATE';
const CREATE_SUCCESS = 'post/CREATE_SUCCESS';
const CREATE_FAIL = 'post/CREATE_FAIL';
const EDIT = 'post/EDIT';
const EDIT_SUCCESS = 'post/EDIT_SUCCESS';
const EDIT_FAIL = 'post/EDIT_FAIL';
const DELETE = 'post/DELETE';
const DELETE_SUCCESS = 'post/DELETE_SUCCESS';
const DELETE_FAIL = 'post/DELETE_FAIL';
const GIF2MP4 = 'post/GIF2MP4';
const GIF2MP4_SUCCESS = 'post/GIF2MP4_SUCCESS';
const GIF2MP4_FAIL = 'post/GIF2MP4_FAIL';
const TURN_OFF_ERROR = 'post/TURN_OFF_ERROR';
const TURN_OFF_MESSAGE = 'post/TURN_OFF_MESSAGE';
const initialState = {
  processing: false,
  error: '',
  message: '',
  data: {},
  mp464: '',
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
    case GIF2MP4:
      return {
        ...state,
        mp464: '',
        processing: true,
        error: '',
      };
    case GIF2MP4_SUCCESS:
      return {
        ...state,
        mp464: action.payload.data,
        message: action.payload.message,
        processing: false,
        error: '',
      };
    case GIF2MP4_FAIL:
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
function gif2mp4() {
  return {
    type: GIF2MP4,
  };
}
function gif2mp4Success(payload) {
  return {
    type: GIF2MP4_SUCCESS,
    payload,
  };
}
function gif2mp4Fail(error) {
  return {
    type: GIF2MP4_FAIL,
    error,
  };
}

export function turnOffError() {
  return (dispatch) => dispatch({ type: TURN_OFF_ERROR });
}
export function turnOffMessage() {
  return (dispatch) => dispatch({ type: TURN_OFF_MESSAGE });
}
export function loadPost(id) {
  return (dispatch) => {
    dispatch(load());
    return getPost(id)
    .then(payload => { dispatch(loadSuccess(payload)); })
    .catch(error => { dispatch(loadFail(error)); });
  };
}
export function createPost(input) {
  return (dispatch) => {
    dispatch(create());
    return postPost(input)
    .then(payload => { dispatch(createSuccess(payload)); })
    .catch(error => { dispatch(createFail(error)); });
  };
}
export function editPost(id, input) {
  return (dispatch) => {
    dispatch(edit());
    return putPost(id, input)
    .then(payload => { dispatch(editSuccess(payload)); })
    .catch(error => { dispatch(editFail(error)); });
  };
}

export function removePost(id) {
  return (dispatch) => {
    dispatch(_delete());
    return deletePost(id)
    .then(payload => { dispatch(deleteSuccess(payload)); })
    .catch(error => { dispatch(deleteFail(error)); });
  };
}
export function _gif2mp4(input) {
  return (dispatch) => {
    dispatch(gif2mp4());
    console.log(input);
    return postGif2mp4(input)
    .then(payload => { console.log(payload); dispatch(gif2mp4Success(payload)); })
    .catch(error => { dispatch(gif2mp4Fail(error)); });
  };
}
