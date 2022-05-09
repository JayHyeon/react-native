import {combineReducers} from 'redux';
import PostReducer from './PostReducer'

export default combineReducers({
    Post: PostReducer
});