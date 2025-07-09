// src/components/SermonInfo.tsx
import { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import sermonImage from '../assets/images/pastor 2.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SermonInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-5" id="sermon-info">
      <Container>
        <Row className="justify-content-center mb-4" data-aos="fade-up">
          <Col md={8} className="text-center">
            <h2 className="fw-bold">Latest Featured Sermon</h2>
            <p className="text-muted">Be inspired and transformed by God’s word</p>
          </Col>
        </Row>
        <Row className="justify-content-center" data-aos="zoom-in">
          <Col md={8}>
            <Card className="shadow-sm border-0">
              <Row className="g-0 align-items-center">
                <Col md={5}>
                  <Card.Img
                    src={sermonImage}
                    alt="Sermon"
                    className="img-fluid rounded-start"
                  />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="fw-bold">Walking in Purpose</Card.Title>
                    <Card.Text>
                      <small className="text-muted">By Pastor Ariyo · July 6, 2025</small>
                    </Card.Text>
                    <Card.Text>
                      Discover how to align your life with God’s purpose and walk boldly in your calling.
                    </Card.Text>
                    <Button variant="primary" href="/sermons">
                      View Full Sermon
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SermonInfo;
