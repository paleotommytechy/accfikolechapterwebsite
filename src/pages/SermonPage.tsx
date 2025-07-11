// src/pages/SermonPage.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SermonGrid from '../components/SermonGrid';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Img from '../assets/images/baptism.jpg'

const SermonPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <div 
        className="d-flex align-items-center text-white z-1"
        style={{
          position: 'relative',
          height: '50vh',
          background: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'center',
          borderRadius: '0 0 15px 15px'
        }}>
        <p className=''style={{margin:'240px 0 0 50px'}}>
          <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
          &nbsp;&nbsp;|| &nbsp;&nbsp;
          <Link to='/sermons' className="text-white fw-bold text-decoration-none fs-6">
            SERMONS 
          </Link>
        </p>
      </div>
      <section className="py-5">
        <Container>
          <Row className="text-center mb-0">
            <Col>
              <h2 className="fw-bold">All Sermons</h2>
              <p className="text-muted">Grow in the Word through our past messages</p>
            </Col>
          </Row>
          <SermonGrid />
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default SermonPage;
