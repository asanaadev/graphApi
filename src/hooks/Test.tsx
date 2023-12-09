// import { useMutation, useQuery } from '@apollo/client'
// import { ADD_TODO, ALL_TODO } from '../client/queries'
import { Button, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from './hooks'
import { useQuery } from '@apollo/client'
import { handleSlice } from '../store/reducers/handleSlice'
import { ALL_TODO } from '../client/queries'



interface pr {
	loading: boolean
	error: undefined
}
const Test = () => {
	const { count } = useAppSelector(state => state.userReducer)
	const { increment } = handleSlice.actions
	const dispatch = useAppDispatch()
	const { loading, data } = useQuery(ALL_TODO)

	if (loading) {
		return <Spin tip="Loading" size="large">
			<div className="content" />
		</Spin>

	}
	return (
		<div>
			{data.allTodos.map((todo: any) => (
				<div key={todo.id}>

					{todo.title}
				</div>
			))}
			<h1>{count}</h1>
			<Button type='primary' onClick={() => dispatch(increment(10))}>increment</Button>
		</div>
	)
}

export default Test
