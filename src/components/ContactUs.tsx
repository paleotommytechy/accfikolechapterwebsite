// src/components/ContactUs.tsx
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactForm from "../components/ContactForm";

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
              <li><strong>Wednesday:</strong> Weekly Bible Study (5:00 PM – 6:30 PM)</li>
              <li><strong>Friday:</strong> Weekly Prayer Metting (5:00 PM – 6:00 PM)</li>
              <li><strong>Sunday:</strong> Glorious Sunday Service (8:00 AM – 11:00 AM)</li>
            </ul>

            <h5 className="fw-semibold mt-4">Location Map</h5>
            <div className="ratio ratio-4x3">
              <iframe
                src="https://www.google.com/maps?q=7.798266,5.514493&output=embed"
                title="ACCF Location"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </Col>

          {/* Right - Contact Form */}
          <Col md={6} data-aos="fade-left">
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;
