// src/pages/AboutPage.tsx
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'
import Section from "../components/About/Section";
import PastorCard from "../components/About/PastorCard";
import ExecutiveCard from "../components/About/ExecutiveCard";
import { pastor, executives } from '../data/ExecutivesDetails';
import Img from "../assets/images/agailio.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import FamilySong from "../components/FamilySong"

const AboutPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
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
        <h1>ABOUT US</h1>
        <p>
          <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
          &nbsp;&nbsp;|| &nbsp;&nbsp;
          <Link to='/about' className="text-white fw-bold text-decoration-none fs-6">
            ABOUT US 
          </Link>
        </p>
      </div>
    </div>
    <div className="container py-5 px-3"> 
        <div data-aos="fade-up" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">Our Story</h2>
          <p className="lead text-secondary text-center mx-auto" style={{ maxWidth: '800px' }}>
            ACCF (All Christian Campus Fellowship) is a Christ-centered student fellowship committed to raising godly leaders and fostering spiritual growth within the campus environment.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">Church History</h2>
          <p className="lead text-secondary text-center mx-auto" style={{ maxWidth: '800px' }}>
            Founded in the early 2000s, ACCF Ikole Chapter began as a small prayer group and has grown into a vibrant community of student believers across all faculties.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">Our Core Values</h2>
          <ul className="list-group list-group-flush mx-auto text-center" style={{ maxWidth: '600px' }}>
            <li className="list-group-item bg-transparent text-dark">Faith in Jesus Christ</li>
            <li className="list-group-item bg-transparent text-dark">Sound Biblical Teaching</li>
            <li className="list-group-item bg-transparent text-dark">Fellowship & Unity</li>
            <li className="list-group-item bg-transparent text-dark">Prayer & Evangelism</li>
            <li className="list-group-item bg-transparent text-dark">Leadership Development</li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="300" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">What We Believe</h2>
          <p className="lead text-secondary text-center mx-auto" style={{ maxWidth: '800px' }}>
            We believe in the infallible Word of God, the Trinity, salvation by grace through faith in Christ, and the empowerment of the Holy Spirit for daily Christian living.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">Mission & Vision</h2>
          <p className="lead text-secondary text-center mx-auto" style={{ maxWidth: '800px' }}>
            <strong>Mission:</strong> To disciple students to become Christlike leaders on campus and beyond.
            <br />
            <strong>Vision:</strong> A campus transformed by the gospel and love of Jesus Christ.
          </p>
        </div>
      <div className="mb-5">
        <FamilySong />
      </div>
       
      <Section title="Meet Our Pastor">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <PastorCard pastor={pastor} />
          </div>
        </div>
      </Section>

      <Section title="Meet Our Executives">
        <div className="row gy-4">
          {executives.map((exec, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <ExecutiveCard exec={exec} />
            </div>
          ))}
        </div>
      </Section>
    </div>
    <Footer />
    </>
  );
};

export default AboutPage;
