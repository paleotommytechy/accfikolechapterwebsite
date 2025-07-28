import React from "react";
import { Link } from 'react-router-dom';
import Img from "../assets/images/agailio.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ImageGrid from "../components/Gallery/ImageGrid";
import { galleryImages } from '../data/galleryImages'
import "../assets/styles/GalleryPage.css"


const GalleryPage: React.FC = () => {

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
        <h1>GALLERY</h1>
        <p>
          <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
          &nbsp;&nbsp;|| &nbsp;&nbsp;
          <Link to='/gallery' className="text-white fw-bold text-decoration-none fs-6">
            GALLERY
          </Link>
        </p>
      </div>
    </div>
    <div className="position-relative min-vh-100">
      
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="display-5 fw-bold" data-aos="fade-down">
            Moments in His Presence
          </h2>
          <p className="lead text-muted" data-aos="fade-up">
            Explore beautiful highlights from our fellowship – Unity, Worship, and Grace.
          </p>
        </div>
      </section>
      <ImageGrid images={galleryImages} />
    </div>
    <Footer />
    </>
  );
};

export default GalleryPage;
