import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer 
      className="bg-dark text-light pt-5 pb-3 mt-5"
      style={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        color: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        borderRadius:'15px 15px 0 0'
      }}>
      <Container>
        <Row className="gy-4">
          {/* Logo and Description */}
          <Col md={4} className="logo">
            <img src={logo} alt="ACCF Logo" height="50" className="mb-3" />
            <p style={{lineHeight:1.6}}><strong>All Christian Campus Fellowship (ACCF)</strong> — Raising godly students in the knowledge and power of Christ Jesus.<br/>A Fellowship with a difference. We Preach, Teach and Pray. </p>
          </Col>

          {/* Quick Links */}
          <h5>Quick Links</h5>
          <div className='col-md-8 mb-4 d-flex flex-wrap align-items-center justify-content-md-end justify-content-start'>
            
            {[
            'About',
            'Sermons',
            'Events',
            // 'Blog',
            'Academics',
            // 'Gallery',
            'Contact',
            'Donate'
          ].map((link, index)=>(

            <a
              key={index}
              href={`/${link.toLowerCase()}`}
              className='text-light text-decoration-none me-4 mb-0'
            >{link}</a>
            
            ))}
          </div>

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
