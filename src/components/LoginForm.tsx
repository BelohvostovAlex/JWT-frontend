import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { login, register } from '../store/reducers/asyncThunk/asyncUser'

export const LoginForm: React.FC = () => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)
    console.log(user)


    const loginHandler = (em: string,pass: string) => {
      const obj = {email: em, password: pass}
      dispatch(login(obj))
    }

    const registerHandler = (em: string,pass: string) => {
      const obj = {email: em, password: pass}
      dispatch(register(obj))
    }
  

  return (
    <div>
        <h1>LoginForm</h1>
        <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => loginHandler(email,password)}>Login</button>
        <button onClick={() => registerHandler(email,password)}>Register</button>
    </div>
  )
}
