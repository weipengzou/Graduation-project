import React, { useState, useEffect } from 'react'
import { Input, Button, Empty, Steps, message, Tooltip, Spin } from 'antd'
import './todo.less'
import { connect } from 'react-redux'
import { getTodoList, delTodoList, updateTodoListStep, addTodoList } from '../../actions/todo'
const Todo = (props: any) => {
  const [addItemVal, setAddItemVal] = useState<string>('')
  useEffect(() => {
    props.getTodoList()
  }, [])
  // 更新item值
  const changItemVal = (val: string) => setAddItemVal(val)
  // 更新todolist
  const updateTodoList = ({ item, CURD, updateProp, updateVal }: any) => {
    message.destroy()
    switch (CURD) {
      case 'add':
        if (item === '') return message.warn('不能为空')
        props.addTodoList({ content: item, curStep: 0 })
        setAddItemVal('')
        message.success('Added successfully')
        break
      case 'del':
        props.delTodoList({ id: item.id })
        message.success('Deleted successfully')
        break
      case 'update':
        props.updateTodoListStep({ item, CURD: 'update', updateProp, updateVal })
        message.success('Updated successfully')
        break
      default:
        message.success('未知操作')
        break
    }
  }
  return (
    <>
      <h2 className="globe_title">Todo</h2>
      <div className="addInput">
        <Input
          type="text"
          onChange={(e) => changItemVal(e.target.value)}
          onPressEnter={() =>
            updateTodoList({
              item: addItemVal,
              CURD: 'add',
            })
          }
          value={addItemVal}
          addonAfter={
            <Button
              onClick={() => {
                updateTodoList({
                  item: addItemVal,
                  CURD: 'add',
                })
              }}
            >
              add todolist
            </Button>
          }
        />
      </div>
      {/* 可细拆成 list item 组件，可以但没必要 */}
      <ul className="todo-list">
        {props.todoList.length > 0 ? (
          props.todoList.map((item: any, index: number) => {
            return (
              <li className="list-item" key={item.content + index}>
                <div className="list-item-content">
                  <Tooltip title={item.content}>
                    <span>{item.content}</span>
                  </Tooltip>
                  <Button onClick={() => updateTodoList({ item, CURD: 'del' })}>DEL</Button>
                </div>
                <Steps
                  size="small"
                  current={item.curStep}
                  onChange={(e) =>
                    updateTodoList({
                      item: item,
                      CURD: 'update',
                      updateProp: 'curStep',
                      updateVal: e,
                    })
                  }
                >
                  <Steps.Step title="规划中"></Steps.Step>
                  <Steps.Step title="进行中"></Steps.Step>
                  <Steps.Step title="已完成"></Steps.Step>
                </Steps>
              </li>
            )
          })
        ) : (
          <Empty className="empty" />
        )}
      </ul>
    </>
  )
}
const mapState = (state: any) => ({
  todoList: state.todo.todoListData,
  isLoading: state.todo.isLoading,
})
export default connect(mapState, {
  getTodoList,
  delTodoList,
  updateTodoListStep,
  addTodoList,
})(Todo)
