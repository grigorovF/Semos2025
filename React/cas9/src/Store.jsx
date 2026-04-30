import {configureStore} from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger';
import SayHelloReducer from './reducers/SayHelloReducer';

const reducer = {
    SayHelloReducer: SayHelloReducer,
}

const logger = createLogger();

export default configureStore({
    reducer: reducer,
    middelware:  (getDefaultMiddelware) => getDefaultMiddelware().concat(logger)
})