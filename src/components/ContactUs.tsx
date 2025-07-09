// src/components/ContactUs.tsx
import { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-5 bg-white" id="contact">
      <Container>
        <Row className="mb-4 text-center">
          <h2 className="fw-bold">Contact Us</h2>
          <p className="text-muted">Reach out, we’d love to hear from you</p>
        </Row>

        <Row className="g-5">
          {/* Left - Contact Info */}
          <Col md={6} data-aos="fade-right">
            <h5 className="fw-semibold">Address</h5>
            <p>ACCF Auditorium, Odi-Olowo, Ikole, Ekiti, Nigeria</p>

            <h5 className="fw-semibold mt-4">Service Times</h5>
            <ul className="list-unstyled">
              <li><strong>Wednesday:</strong> 5:00 PM – 6:30 PM</li>
              <li><strong>Friday:</strong> 5:00 PM – 6:00 PM</li>
              <li><strong>Sunday:</strong> 8:00 AM – 11:00 AM</li>
            </ul>

            <h5 className="fw-semibold mt-4">Location Map</h5>
            <div className="ratio ratio-4x3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.999235634768!2d3.896143114775068!3d7.377535694662096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039ec8aa0c4a1c5%3A0x79fcb9253adcbfc9!2sUniversity%20of%20Ibadan!5e0!3m2!1sen!2sng!4v1629987555950!5m2!1sen!2sng"
                title="ACCF Location"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </Col>

          {/* Right - Contact Form */}
          <Col md={6} data-aos="fade-left">
            <h5 className="fw-semibold mb-3">Send a Message</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message..." required />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;
