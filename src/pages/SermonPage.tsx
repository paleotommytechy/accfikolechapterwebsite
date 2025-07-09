// src/pages/SermonPage.tsx
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SermonGrid from '../components/SermonGrid';
import HeroSection from '../components/HeroSection'
import AOS from 'aos';
import 'aos/dist/aos.css';

const SermonPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
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
