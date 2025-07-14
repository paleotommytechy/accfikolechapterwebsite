// src/pages/ContactPage.tsx
import React from "react";
import { Link } from 'react-router-dom';
import ContactForm   from "../components/ContactForm";
import GoogleMap     from "../components/GoogleMap";
import ServiceTimes  from "../components/ServiceTimes";
import Img from "../assets/images/image4.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  return(
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
    }}>
    <div style={{margin:'240px 0 0 50px'}}>
      <h1>CONTACT US</h1>
      <p>
        <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
        &nbsp;&nbsp;|| &nbsp;&nbsp;
        <Link to='/contact' className="text-white fw-bold text-decoration-none fs-6">
          CONTACT US
        </Link>
      </p>
    </div>
  </div>
  <div className="container py-5">
    <h2 className="text-center mb-5">Contact Us</h2>

    {/* Address & Service Times */}
    <div className="row gy-4 mb-5" data-aos='fade-down'>
      <div className="col-lg-6">
        <GoogleMap />
      </div>

      <div className="col-lg-6 d-flex flex-column gap-4">
        <div className="p-4 shadow rounded-4">
          <h5 className="mb-3">Fellowship Address</h5>
          <p className="mb-0">
            All Christain Campus Fellowship, Ikole Campus<br />
            Federal University Of Oye Ekiti<br />
            Ikole‑Ekiti, Nigeria
          </p>
        </div>
        <ServiceTimes />
      </div>
    </div>

    {/* Ask‑a‑Question Form */}
    <div className="row justify-content-center" data-aos='fade-down'>
      <div className="col-md-8 col-lg-6">
        <ContactForm />
      </div>
    </div>
  </div>
  <Footer />
  </>
)};

export default ContactPage;
