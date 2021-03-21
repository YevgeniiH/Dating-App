import { combineReducers, createStore } from 'redux';
import AuthReducer from './reducers/auth';

const store = createStore(
    combineReducers({
        auth: AuthReducer
}));
export default store;