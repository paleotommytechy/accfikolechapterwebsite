import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <Container>
        <Row className="gy-4">
          {/* Logo and Description */}
          <Col md={4} className="logo">
            <img src={logo} alt="ACCF Logo" height="50" className="mb-3" />
            <p>All Christian Campus Fellowship (ACCF) — raising godly students in the knowledge and power of Christ Jesus.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/sermons" className="text-light text-decoration-none">Sermons</a></li>
              <li><a href="/events" className="text-light text-decoration-none">Events</a></li>
              <li><a href="/blog" className="text-light text-decoration-none">Blog</a></li>
              <li><a href="/donate" className="text-light text-decoration-none">Donate</a></li>
            </ul>
          </Col>

          {/* Contact and Socials */}
          <Col md={4}>
            <h5>Contact</h5>
            <p><FaEnvelope /> accfikolechapter001@gmail.com</p>
            <p><FaPhone /> +234 902 816 8649</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaYoutube /></a>
         
            </div>
          </Col>
        </Row>

        {/* Bottom bar */}
        <Row className="pt-4 mt-4 border-top border-light">
          <Col className="text-center small">
            &copy; {new Date().getFullYear()} ACCF. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
