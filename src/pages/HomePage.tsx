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
import FamilySong from "../components/FamilySong"
import AcademicRedirectCard from '../components/AcademicRedirectCard';


const HomePage: React.FC = () => {
  return (
    
    <div style={{ overflowX: 'hidden', width: '100%', margin: 0, padding: 0 }}>
      <NavBar />
      <HeroSection />
      <AboutFellowship />
      <FamilySong />
      <AcademicRedirectCard />
      <SermonInfo />
      <UpcomingEvent />
      <StoriesSlider />
      <ContactUs />
      <Footer />
    </div>
  )
}


export default HomePage;