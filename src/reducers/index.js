import { combineReducers } from 'redux';
import moviesInfo from './moviesInfo';
import sort from './sort';

export default combineReducers({
  moviesInfo,
  sort
});
