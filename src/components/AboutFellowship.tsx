// src/components/AboutFellowship.tsx
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import fellowshipImage from '../assets/images/judah.jpg';
import { FaCross, FaBible, FaPrayingHands } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/AboutFellowship.css';

const AboutFellowship = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="about-section py-5 bg-light" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={6} data-aos="fade-right">
            <img
              src={fellowshipImage}
              alt="About Fellowship"
              className="img-fluid rounded shadow"
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
  );
};

export default AboutFellowship;
