import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from './pages/Home';
import Todo from './components/Todo';

function App() {
  let navigate = useNavigate();
  const isLoggedIn = window.sessionStorage.getItem('token') ? true : false;

  React.useEffect(() => {
    isLoggedIn ? navigate('/') && navigate('/list-tods-creation') : navigate('/signIn');
  }, [])

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path='/list-tods-creation' element={<Todo />} />
    </Routes>
  );
}

export default App;
