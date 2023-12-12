import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { IUser } from "src/models/IUser"
// import { fetchUsers } from "./ActionCreators"
interface IUser {
	name: null | string,
	token: null | string,
}

interface UserState {
	user?: IUser
}

const initialState: IUser = {
	name: null,
	token: null,
};


export const handleSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.name = action.payload.name;
			// state.token = action.payload.token
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
