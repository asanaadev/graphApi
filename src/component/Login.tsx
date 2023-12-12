import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { handleSlice } from '../store/reducers/handleSlice';
import { Link } from 'react-router-dom';
interface MyState {
	token: string;
	name: string;
}

const Login = () => {
	const [inputValue, setInputValue] = useState<MyState>({
		token: "",
		name: "",
	})
	const { name } = useAppSelector(state => state.userReducer)
	const { setUser } = handleSlice.actions
	const dispatch = useAppDispatch()


	const loginHandle = (): void => {
		// e.preventDefault()
		if (inputValue.name.trim().length) {
			// dispatch(setUser(inputValue.name))
			// setInputValue({
			// 	repositoryId: "",
			// 	name: "",
			// 	body: ""
			// });
			dispatch(setUser(inputValue))
		}
		console.log('Submitted value:', inputValue.name);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setInputValue(prevState => ({
			...prevState,
			name: newTitle
		}));
	};
	return (
		<div>
			<input className='text-black' onChange={handleInputChange} type="text" value={inputValue.name} placeholder='name' />
			<button onClick={loginHandle}>submit</button>
			<div className="">
				<Link to='/'>main</Link>

			</div>
		</div>
	)
}

export default Login
