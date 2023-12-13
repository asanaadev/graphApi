import { Button, Form, Input, Space } from 'antd';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { CREATE_ISSUE, GET_ALL_REPOSITORY } from '../client/queries';
import { useMutation } from '@apollo/client';
import { Data } from '../models/ICreateContent';

interface MyState {
	repositoryId?: string;
	title: string;
	body?: string;
}


const CreateContent: FC<Data> = ({ data }) => {
	const [inputValue, setInputValue] = useState<MyState>({
		title: '',
		body: '',
	});


	const [createIssue, { error: issueERR }] = useMutation(CREATE_ISSUE, {
		refetchQueries: [{ query: GET_ALL_REPOSITORY }],
		onCompleted: () => {
			setInputValue({
				title: '',
				body: '',
			});
		},
	})
	if (issueERR) return <h1>Error...</h1>
	const handleSubmit = (e: FormEvent) => {
		// e.preventDefault();
		if (inputValue.title.trim().length) {
			createIssue({
				variables: {
					repositoryId: data.id,
					title: inputValue.title,
					body: inputValue.body
				}
			});
			setInputValue({
				title: "",
				body: ""
			});
		}
		console.log('Submitting form with data:', inputValue);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setInputValue((prevData) => ({
			...prevData,
			title: value,
		}));
	};
	const handleInputBodyChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setInputValue((prevData) => ({
			...prevData,
			body: value,
		}));
	};


	return (
		<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
			<Form onFinish={handleSubmit} name="firstForm" layout="vertical" autoComplete="off">
				<Form.Item name="name" label="Title" rules={[{ required: true }]}>
					<Input placeholder={data.title} value={inputValue.title} onChange={handleInputChange} />
				</Form.Item>
				<Form.Item name={["user", "introduction"]} label="Body">
					<Input.TextArea placeholder={data.body} value={inputValue.body} onChange={handleInputBodyChange} />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						{/* <SubmitButton form={form} /> */}
						<Button htmlType="reset">Reset</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default CreateContent
