// src/pages/DonationPage.tsx
import React from "react";
import DonationInfo from '../components/DonationInfo'

import Img from "../assets/images/sermon.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const DonationPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div 
        className="d-flex align-items-center text-white z-1 mb-0"
        style={{
          position: 'relative',
          height: '50vh',
          background: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'center',
          borderRadius: '0 0 15px 15px'

        }}
        data-aos='fade-up'
        >
        <div style={{margin:'240px 0 0 50px'}}>
          <h1>DONATION</h1>
          <p>
            <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
            &nbsp;&nbsp;|| &nbsp;&nbsp;
            <Link to='/donate' className="text-white fw-bold text-decoration-none fs-6">
             DONATION
            </Link>
          </p>
        </div>
      </div>
      <DonationInfo />
      <Footer />
    </>
  );
};

export default DonationPage;
