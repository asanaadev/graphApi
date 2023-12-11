import { useMutation } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react'
import { CREATE_ISSUE, GET_ALL_REPOSITORY } from '../client/queries';
import { Button } from 'antd';

interface MyState {
	repositoryId: string;
	title: string;
	body: string;
}

const Modify = () => {
	// DATA FROM USER
	const [inputValue, setInputValue] = useState<MyState>({
		repositoryId: "",
		title: "",
		body: "",
	});
	// REQUEST TO THE GRAPHQL HITGUB API VIA useMutation AND CREATE_ISSUE
	const [createIssue, { error: issueERR }] = useMutation(CREATE_ISSUE, {
		refetchQueries: [
			{ query: GET_ALL_REPOSITORY }
		]
	})

	// HANDLE FUNCTIONS
	const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>): void => {
		e.preventDefault()
		if (inputValue.title.trim().length) {
			createIssue({
				variables: {
					repositoryId: inputValue.repositoryId,
					title: inputValue.title,
					body: inputValue.body
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

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setInputValue(prevState => ({
			...prevState,
			title: newTitle
		}));
	};

	const handlekey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") handleSubmit(e);
	}

	return (
		<div>
			<form onSubmit={e => handleSubmit(e)}>
				<input type="text" className='text-black' value={inputValue.title} onChange={handleInputChange} />
				<Button type='primary' onKeyDown={handlekey} htmlType="submit">submit</Button>
			</form>
		</div>
	)
}

export default Modify
