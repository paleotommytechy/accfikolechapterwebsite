// src/components/SermonInfo.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  thumbnail: string;
  link: string;
}

const SermonInfo = () => {
  const [sermon, setSermon] = useState<Sermon | null>(null);

  useEffect(() => {
    const fetchSermon = async () => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("date", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching sermon:", error);
      } else {
        setSermon(data);
      }
    };

    fetchSermon();
  }, []);

  // Helper to format the date like "7th of July, 2025"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return `${day}${suffix} of ${month}, ${year}`;
  };

  if (!sermon) return null;

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
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="img-fluid rounded-start"
                  />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="fw-bold">{sermon.title}</Card.Title>
                    <Card.Text>
                      <small className="text-muted">
                        {sermon.speaker} · {formatDate(sermon.date)}
                      </small>
                    </Card.Text>
                    <Button
                      style={{
                        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
                        color: '#fff',
                      }}
                      href={sermon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
