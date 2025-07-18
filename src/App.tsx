import { Routes, Route} from 'react-router-dom';
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import React from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import SermonPage from './pages/SermonPage'
import EventPage from './pages/EventPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import AcademicsPage from './pages/AcademicsPage'
import DonationPage from './pages/DonationPage'


const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); 
  }, []);
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sermons' element={<SermonPage />} />
      <Route path='/events' element={<EventPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/gallery' element={<GalleryPage />} />
      <Route path='/blog' element={<BlogPage />} />
      <Route path='/blog/:id' element={<BlogPostPage />} />
      <Route path='/academics' element={<AcademicsPage />} />
      <Route path='/donate' element={<DonationPage />} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/register' element={<RegisterForm />} />
    </Routes>
  )
}

export default App;