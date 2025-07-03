import { Routes, Route} from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';



const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/register' element={<RegisterForm />} />
    </Routes>
  )
}

export default App
