// src/components/About/PastorCard.tsx
import React from "react";

type Pastor = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

const PastorCard: React.FC<{ pastor: Pastor }> = ({ pastor }) => (
  <div className="card border-0 shadow rounded-4 overflow-hidden">
    <img src={pastor.image} className="card-img-top" alt={pastor.name} />
    <div className="card-body">
      <h5 className="card-title">{pastor.name}</h5>
      <p className="text-muted mb-1">{pastor.role}</p>
      <p className="card-text">{pastor.bio}</p>
    </div>
  </div>
);

export default PastorCard;
