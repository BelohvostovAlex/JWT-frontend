import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { checkAuth, logout } from './store/reducers/asyncThunk/asyncUser';

const App: React.FC = () => {
  const [users, setUsers] = React.useState<IUser[]>([])
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    if(localStorage.getItem('token')) {
      console.log('yes')
      dispatch(checkAuth())
    }
  }, [])

  async function getUsers() {
    try {
      const {data} = await UserService.fetchUsers()
      console.log(data)
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const {isAuth, user, isLoading} = useAppSelector(state => state.user)
  if(isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      {!isAuth 
      ? <LoginForm /> 
      : <>
      <h3>{isAuth && `Hello mr/ms, u entered ur personal account! You are athorized, ur email is: ${user.email}`}</h3>
      <h3>{user.isActivated ? 'email was confirmed': 'please activate ur acc by email'}</h3>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <div>
        <button onClick={getUsers}>Get users</button>
        {users?.map(user => {
          return <React.Fragment key={user.id}>
          <h4>Email: {user.email}</h4>
          <p>ID: {user.id}, Activated: {user.isActivated.toString()}</p>
        </React.Fragment>
        })}
      </div>
      </>}
    </div>
  );
}

export default App;
