import React from 'react';
import '../assets/styles/NavBar.css';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import AboutFellowship from '../components/AboutFellowship';
import SermonInfo from '../components/SermonInfo';
import UpcomingEvent from '../components/UpcomingEvent';
import StoriesSlider from '../components/StoriesSlider';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';


const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <AboutFellowship />
      <SermonInfo />
      <UpcomingEvent />
      <StoriesSlider />
      <ContactUs />
      <Footer />
    </>
  )
}


export default HomePage;