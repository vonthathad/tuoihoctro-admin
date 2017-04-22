import { combineReducers } from 'redux';
import gameList from './gameList';
import gameDetail from './gameDetail';
export default combineReducers({
  gameList,
  gameDetail,
});
