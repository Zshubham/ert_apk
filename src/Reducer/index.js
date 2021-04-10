import { combineReducers } from 'redux';
import authReducer from './authReducer';
import feedReducer from './feedReducer';
// redux store for saving data 
export default combineReducers({
  auth: authReducer,
  // store authentication data
  feed: feedReducer,
  // store feed data
})