import { Button, Form, FormInstance, Input, Radio, Space, ConfigProvider } from "antd"
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { GET_ISSUES, UPDATE_ISSUE } from "../client/queries";
import { useMutation } from "@apollo/client";

interface MyState {
	repositoryId?: string;
	title: string;
	body?: string;
}

const ModifyContent = ({ item }: any) => {
	// console.log(item);

	const [inputValue, setInputValue] = useState<MyState>({
		title: '',
		body: '',
	});
	const [UpdateIssue, { error: issueERR }] = useMutation(UPDATE_ISSUE, {
		refetchQueries: [
			{ query: GET_ISSUES }
		],
	})
	if (issueERR) return <h1>Errroe...</h1>
	const handleSubmit = (e: FormEvent) => {
		// e.preventDefault();
		if (inputValue.title.trim().length) {
			UpdateIssue({
				variables: {
					issueId: item.id,
					body: inputValue.body,
					title: inputValue.title
				}
			});
			setInputValue({
				title: "",
				body: ""
			});
		}
		console.log('Submitting form with data:', inputValue);
	};


	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValue((prevData) => ({
			...prevData,
			title: value,
		}));
	};
	const handleInputBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setInputValue((prevData) => ({
			...prevData,
			body: value,
		}));
	};
	// console.log(inputValue.title);

	return (
		<div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
			<Form onFinish={handleSubmit} name="secondForm" layout="vertical" autoComplete="off">
				<Form.Item name="name2" label="Title" rules={[{ required: true }]}>
					<Input onChange={handleInputChange} value={inputValue.title} placeholder={item.title} />
				</Form.Item>
				<Form.Item name={["user2", "introduction2"]} label="Body">
					<Input.TextArea onChange={handleInputBodyChange} value={inputValue.body} placeholder={item.body} />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button htmlType="reset">Reset</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ModifyContent
