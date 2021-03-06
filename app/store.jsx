import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { whoami } from './reducers/auth'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

store.dispatch(whoami()) 

