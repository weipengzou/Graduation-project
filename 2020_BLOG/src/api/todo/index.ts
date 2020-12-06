// import { http } from '../index'
import axios from 'axios'
const getTodoList = () => {
	// return http.get('https://zwp1.top/api/todo')
}
// 增加代办列表
const addTodoList = async ({
	ip,
	content,
}: {
	ip: string
	content: string
}) => {
	let res = await axios.post('/todo', {
		ip,
		content,
	})
	return res
}

export { getTodoList, addTodoList }
