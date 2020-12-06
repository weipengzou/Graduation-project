export interface todoListItem {
	content: string
	curStep: number
}

export interface IupdateTodoList {
	item: any
	updateVal?: any
	updateProp?: 'id' | 'content' | 'curStep'
	CURD: 'add' | 'del' | 'update'
}

export interface IaddTodoList {
	content: string
	curStep: number
}

export interface IdelTodoList {
	id: number
}
