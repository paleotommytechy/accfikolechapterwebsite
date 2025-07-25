import { Container, Button } from 'react-bootstrap';
import '../assets/styles/HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section d-flex align-items-center text-white">
      <Container className="text-center">
        <h1 className="title fs-1 display-4 fw-bold">WELCOME TO ACCF IKOLE</h1>
        <p className="lead">All Christian Campus Fellowship - A Place to Encounter Jesus, Grow Spiritually, and Serve Boldly.</p>
        <Button variant="light" href="/about" className="mt-3 fw-semibold">
          Learn More About Us
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;
