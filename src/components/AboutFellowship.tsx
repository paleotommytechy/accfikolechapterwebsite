// src/components/AboutFellowship.tsx
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCross, FaBible, FaPrayingHands } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/AboutFellowship.css';

import images from '../data/FellowshipImages';




const AboutFellowship = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [currentImageIndex]);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1)% images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused, currentImageIndex]);

  return (
    <>
    <section className="about-section py-5 " id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={6} 
            data-aos={images[currentImageIndex].animation}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <img
              src={images[currentImageIndex].src}
              alt="About Fellowship"
              className="img-fluid rounded shadow "
            />
          </Col>
          <Col md={6} data-aos="fade-left">
            <p>
              <strong>All Christian Campus Fellowship (ACCF)</strong> is a dynamic and Spirit-filled community committed to preaching Christ on campus, building disciples, and raising godly leaders. Our mission is rooted in love, holiness, and purposeful living.
            </p>
            <ul className="list-unstyled">
              <li><FaCross className="me-2 text-primary" /> Christ-centered teaching</li>
              <li><FaBible className="me-2 text-primary" /> Deep Bible study and prayer life</li>
              <li><FaPrayingHands className="me-2 text-primary" /> Vibrant worship and intercession</li>
            </ul>
            <blockquote className="blockquote mt-4">
              <p className="mb-0 fst-italic">“Let no one despise your youth, but be an example to the believers...”</p>
              <footer className="blockquote-footer mt-1">1 Timothy 4:12</footer>
            </blockquote>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};

export default AboutFellowship;
