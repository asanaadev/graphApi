import userReducer from './reducers/handleSlice';
import { configureStore, combineReducers } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
	userReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
