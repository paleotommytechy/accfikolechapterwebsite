// src/components/ServiceTimes.tsx
import React from "react";

const ServiceTimes: React.FC = () => (
  <div className="p-4 shadow rounded-4 h-100">
    <h5 className="mb-3">Service Times</h5>
    <ul className="list-unstyled">
      <li className="mb-2"><strong>Sunday Worship:</strong> 8:00 AM – 11:30 AM</li>
      <li className="mb-2"><strong>Mid‑Week Bible Study:</strong> Wed 5:00 PM – 6:30 PM</li>
      <li className="mb-2"><strong>Prayer Meeting:</strong> Fri 5:00 PM – 6:00 PM</li>
    </ul>
  </div>
);

export default ServiceTimes;
