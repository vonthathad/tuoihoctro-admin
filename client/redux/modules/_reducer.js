import { combineReducers } from 'redux';
import auth from './auth';
import adminList from './adminList';
import adminDetail from './adminDetail';
import postList from './postList';
import postDetail from './postDetail';
export default combineReducers({
  auth,
  adminList,
  adminDetail,
  postList,
  postDetail,
});
