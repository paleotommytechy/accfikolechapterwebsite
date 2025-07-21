// src/components/EventCard.tsx 
import React from "react";

type EventProps = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
};

const EventCard: React.FC<EventProps> = ({
  title,
  date,
  time,
  location,
  description,
  image,
}) => {
  return (
    <div className="card mb-4 shadow-sm border-0 rounded-4">
      <img src={image} className="card-img-top rounded-top-4" alt={title} />
      <div className="card-body">
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-muted mb-1">
          <i className="fas fa-calendar-alt me-2"></i>{date} at {time}
        </p>
        <p className="card-text text-muted mb-1">
          <i className="fas fa-map-marker-alt me-2"></i>{location}
        </p>
        <p className="card-text">{description}</p>
        <button className="btn btn-outline-primary mt-2">Learn More</button>
      </div>
    </div>
  );
};

export default EventCard;
