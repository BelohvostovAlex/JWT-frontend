import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../http/axiosApi"
import { loginUser } from "../../../models/loginUser"
import AuthService from "../../../services/AuthService"

export const login = createAsyncThunk(
    'user/login', 
    async (loginData: loginUser, thunkAPI) => {
        try {
            const {email,password} = loginData
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            return loginData
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
})

export const register = createAsyncThunk(
    'user/register', 
    async (loginData: loginUser, thunkAPI) => {
        try {
            const {email,password} = loginData
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            return loginData
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
})

export const logout = createAsyncThunk(
    'user/logout', 
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
})

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async(_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {
                withCredentials: true
            })
            localStorage.setItem('token', response.data.accessToken)
            return response.data.user
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)