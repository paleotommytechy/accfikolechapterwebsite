// src/components/About/ExecutiveCard.tsx
import React from "react";
import { FaWhatsapp, FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

type Exec = {
  name: string;
  position: string;
  image: string;
  whatsapp: string;
  facebook: string;
  phone: string;
  email: string;
};

const ExecutiveCard: React.FC<{ exec: Exec }> = ({ exec }) => (
  <div className="card text-center border-0 shadow-sm rounded-4 p-3">
    <img
      src={exec.image}
      alt={exec.name}
      className="rounded-circle mx-auto img-fluid d-block"
      style={{height:'150px', width:'150px', objectFit:'cover'}}
    />
    <div className="card-body">
      <h6 className="fw-bold mb-0">{exec.name}</h6>
      <small className="text-muted">{exec.position}</small>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <a href={`https://wa.me/${exec.whatsapp}`}><FaWhatsapp /></a>
        <a href={exec.facebook}><FaFacebookF /></a>
        <a href={`tel:${exec.phone}`}><FaPhoneAlt /></a>
        <a href={`mailto:${exec.email}`}><FaEnvelope /></a>
      </div>
    </div>
  </div>
);

export default ExecutiveCard;
