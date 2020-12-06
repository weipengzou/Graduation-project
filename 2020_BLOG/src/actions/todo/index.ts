import { actionTypes } from '../index'
import { todoListItem, IupdateTodoList, IdelTodoList } from '../../types/todo'
import { getTodoList as getTodoListAPI } from '../../api/todo'
const getTodoList = () => async (dispatch: any) => {
  console.log('触发 getTodoList action')
  dispatch({
    type: actionTypes.GET_TODOLIST,
  })
}
const addTodoList = ({ content, curStep }: todoListItem) => (dispatch: any) => {
  dispatch({
    type: actionTypes.ADD_TODOLIST,
    payload: {
      content,
      curStep,
    },
  })
}
const updateTodoListStep = ({ item, updateProp, updateVal }: IupdateTodoList) => (dispatch: any) => {
  dispatch({
    type: actionTypes.UPDATE_TODOLIST,
    payload: {
      id: item.id,
      updateProp,
      updateVal,
    },
  })
}
const delTodoList = ({ id }: IdelTodoList) => (dispatch: any) => {
  dispatch({
    type: actionTypes.DEL_TODOLIST,
    payload: { id },
  })
}

export { getTodoList, addTodoList, updateTodoListStep, delTodoList }
