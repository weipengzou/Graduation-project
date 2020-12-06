import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootRedux from './reducers'
export default createStore(rootRedux, applyMiddleware(thunk))
