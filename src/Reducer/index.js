import { combineReducers } from 'redux';
import authReducer from './authReducer';
import feedReducer from './feedReducer';

export default combineReducers({
  auth: authReducer,
  feed: feedReducer,
})