import { Routes, Route} from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import SermonPage from './pages/SermonPage'
import EventPage from './pages/EventPage'





const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sermons' element={<SermonPage />} />
      <Route path='/events' element={<EventPage />} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/register' element={<RegisterForm />} />
    </Routes>
  )
}

export default App
