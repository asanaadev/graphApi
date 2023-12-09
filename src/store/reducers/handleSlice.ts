import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { IUser } from "src/models/IUser"
// import { fetchUsers } from "./ActionCreators"
interface IUser {
	id: number
	name: string
	email: string
}

interface UserState {
	users?: IUser[]
	count: number
}

const initialState: UserState = {
	users: [],
	count: 0
}

export const handleSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		increment: (state, action: PayloadAction<number>) => {
			state.count += action.payload
		}
		// usersFetching(state) {
		// 	state.isLoading = true
		// },
		// usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
		// 	state.isLoading = false
		// 	state.error = ''
		// 	state.users = action.payload
		// },
		// usersFetchingError(state, action: PayloadAction<string>) {
		// 	state.isLoading = false
		// 	state.error = action.payload
		// },
	},
})

export default handleSlice.reducer
