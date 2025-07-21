import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const AcademicRedirectCard: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/academics');
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <Card
        className="shadow-lg border-0 rounded-4 p-3"
        style={{ maxWidth: '600px', cursor: 'pointer' }}
        data-aos="fade-up"
        onClick={handleRedirect}
      >
        <Card.Body className="text-center">
          <Card.Title className="fs-3 fw-bold text-primary">
            Fuel Your Academic Journey
          </Card.Title>
          <Card.Text className="fs-5 text-secondary mt-3">
            Dive into a treasure trove of academic resources, past questions, and study materials to help you thrive as a Christian undergraduate.
          </Card.Text>
          <Button
            variant="primary"
            className="mt-4 px-4 py-2 rounded-pill"
            onClick={(e) => {
              e.stopPropagation();
              handleRedirect();
            }}
          >
            Go to Academics
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AcademicRedirectCard;
