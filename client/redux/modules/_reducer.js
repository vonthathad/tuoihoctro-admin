import { combineReducers } from 'redux';
import auth from './auth';
import gameList from './gameList';
import gameDetail from './gameDetail';
export default combineReducers({
  auth,
  gameList,
  gameDetail,
});
