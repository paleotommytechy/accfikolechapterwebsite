import { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventImage from '../assets/images/logos.jpg';

const UpcomingEvent = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-5 bg-white" id="event">
      <Container>
        <Row className="justify-content-center mb-4" data-aos="fade-up">
          <Col md={8} className="text-center">
            <h2 className="fw-bold">Upcoming Event</h2>
            <p className="text-muted">Don't miss our next fellowship gathering</p>
          </Col>
        </Row>
        <Row className="justify-content-center" data-aos="fade-up">
          <Col md={8}>
            <Card className="border-0 shadow-sm p-4">
            <Col md={5}>
                  <Card.Img
                    src={EventImage}
                    alt="Sermon"
                    className="img-fluid rounded-start"
                  />
                </Col>
              <Card.Body>
                <Card.Title className="fw-bold fs-4 mb-3">Online Word and Prayer Meeting</Card.Title>
                <Card.Text className="mb-2">
                  <FaCalendarAlt className="me-2 text-primary" />
                  <strong>Date:</strong> 19th of July, 2025
                </Card.Text>
                <Card.Text>
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <strong>Location:</strong> Google Meet
                </Card.Text>
                <Button variant="outline-primary" href="https://meet.google.com/" target="_blank" rel="noopener noreferrer" className="mt-3">
                  Join on Google Meet
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UpcomingEvent;
