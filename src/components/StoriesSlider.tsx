// src/components/StoriesSlider.tsx
import { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { articles } from '../data/articles';
import AOS from 'aos';
import 'aos/dist/aos.css';

const StoriesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    AOS.init();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5 bg-light" id="stories">
      <Container>
        <Row className="mb-4 text-center">
          <h2 className="fw-bold">Stories & Articles</h2>
          <p className="text-muted">Faith-building content for your spiritual journey</p>
        </Row>

        <Row className="justify-content-center" data-aos="fade-left">
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Img
                src={articles[currentSlide].image}
                alt={articles[currentSlide].title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{articles[currentSlide].title}</Card.Title>
                <Card.Text>{articles[currentSlide].snippet}</Card.Text>
                <a href="/blog" className="btn btn-outline-primary mt-2">
                  Read More Articles
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StoriesSlider;
