import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { supabase } from '../lib/supabaseClient';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url: string;
};

const UpcomingEvent = () => {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchUpcoming = async () => {
      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(1);

      if (error) console.error('Error fetching upcoming event:', error);
      else setEvent(data?.[0] || null);
    };

    fetchUpcoming();
  }, []);

  return (
    <section className="py-2 bg-white" id="event">
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
                  src={event?.image_url}
                  alt={event?.title}
                  className="img-fluid rounded-start"
                />
              </Col>
              <Card.Body>
                <Card.Title className="fw-bold fs-4 mb-3">
                  {event?.title}
                </Card.Title>
                <Card.Text className="mb-2">
                  <FaCalendarAlt className="me-2 text-primary" />
                  <strong>Date:</strong>{' '}
                  {event?.date
                    ? new Date(event.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }):'No date Provided'}
                </Card.Text>
                <Card.Text>
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <strong>Location:</strong> {event?.location}
                </Card.Text>
                
                <Link to="/events" className="btn btn-outline-primary">Learn More</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UpcomingEvent;
