import { Button, Form, Input, Radio, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from './hooks'
import { useMutation, useQuery } from '@apollo/client'
import { handleSlice } from '../store/reducers/handleSlice'
import { CREATE_ISSUE, GET_ISSUES, GET_REPOSITORY } from '../client/queries'
import { client } from '../client/client'
import { ChangeEvent, FC, useEffect, useState } from 'react'

interface MyState {
	repositoryId: string;
	title: string;
	body: string;
}
type LayoutType = Parameters<typeof Form>[0]['layout'];


const Test: FC = () => {
	const { count } = useAppSelector(state => state.userReducer)
	const [inputValue, setInputValue] = useState<MyState>({
		repositoryId: "",
		title: "",
		body: ""
	});
	console.log(inputValue.title);

	const { increment } = handleSlice.actions
	const dispatch = useAppDispatch()
	const [createIssue, { error: issueERR }] = useMutation(CREATE_ISSUE, {
		// refetchQueries: [
		// 	{ query: ALL_TODO }
		// ]
	})

	const { loading, error, data } = useQuery(GET_REPOSITORY, {
		client,
		variables: {
			username: "facebook",
			repository: "react",
		},
	});
	const { data: issues } = useQuery(GET_ISSUES, {
		client,
		variables: {
			userLogin: "Zhumabai00",
		},
	});
	if (loading) return <Spin tip="Loading" size="large"><div className="content" /></Spin>
	// if (error) return <p>Error : {error.message}</p>;

	// console.log(import.meta.env.VITE_GITHUB_TOKEN);
	console.log(data)
	// console.log(issues.user.repositories.edges[8].node.issues.edges[0].node.title);
	// const user = issues.user.repositories.edges.map((item: any) => (
	// 	item.node.issues
	// ));
	// console.log(user.issues.edges.map((item: any) => item.node.title));
	const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>): void => {
		e.preventDefault()
		if (inputValue.title.trim().length) {
			createIssue({
				variables: {
					repositoryId: "R_kgDOKSQM9w",
					title: inputValue.title,
					body: ""
				}
			});
			setInputValue({
				repositoryId: "",
				title: "",
				body: ""
			});
		}
		console.log('Submitted value:', inputValue.title);
	};
	// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
	// 	setInputValue({
	// 		...inputValue,
	// 		title: event.target.value
	// 	});
	// };
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setInputValue(prevState => ({
			...prevState,
			title: newTitle
		}));
	};
	const handlekey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "Enter") handleSubmit(event);
	}

	return (
		<div>
			<h1>
				{data.repository.name}
			</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<input type="text" style={{ border: "1px solid black", outline: "none" }} value={inputValue.title} onChange={handleInputChange} />
				<Button type='primary' htmlType="submit">submit</Button>
			</form>
			<h1>{count}</h1>
			<Button type='primary' onClick={() => dispatch(increment(10))}>increment</Button>
		</div>
	)
}

export default Test
