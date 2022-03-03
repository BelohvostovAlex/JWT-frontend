import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../models/IUser"
import {checkAuth, login, logout} from './asyncThunk/asyncUser'


interface userSliceState {
    user: IUser,
    isAuth: boolean, 
    isLoading: boolean
}

const initialState: userSliceState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: {
        [login.fulfilled.type]: (state,action) => {
            state.isAuth = true
            state.user = action.payload
            state.isLoading = false
        },
        [login.pending.type]: (state) => {
            state.isLoading = true
        },
        [logout.fulfilled.type]: (state) => {
            state.isAuth = false
            state.user = {} as IUser
            state.isLoading = false
        },
        [logout.pending.type]: (state) => {
            state.isLoading = true
        },
        [checkAuth.fulfilled.type]: (state, action) => {
            state.isAuth = true
            state.user = action.payload
            state.isLoading = false
        },
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true
        },
    }
})

export default userSlice.reducer