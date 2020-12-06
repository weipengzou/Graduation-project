import { combineReducers } from 'redux'
import todo from './todo'
import article from './article'
import user from './user'
export default combineReducers({
	todo,
	article,
	user,
})
