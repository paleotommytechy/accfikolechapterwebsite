import { Card, Col, Row, Button } from 'react-bootstrap';
import { sermons } from '../data/sermons';

const SermonGrid = () => {
  return (
    <Row className="g-4" data-aos="fade-up">
      {sermons.map((sermon) => (
        <Col key={sermon.id} md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img
              variant="top"
              src={sermon.thumbnail}
              alt={sermon.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{sermon.title}</Card.Title>
              <Card.Text>
                <small className="text-muted">
                  {sermon.speaker} · {sermon.date}
                </small>
              </Card.Text>
              <Button
                
                href={sermon.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
                  color: '#fff',
                }}
              >
                Watch Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SermonGrid;
