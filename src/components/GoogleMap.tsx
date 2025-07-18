// src/components/GoogleMap.tsx
import React from "react";

const GoogleMap: React.FC = () => (
  <div className="ratio ratio-16x9 rounded-4 shadow">
    <iframe
      title="ACCF Map"
      src="https://www.google.com/maps?q=7.798266,5.514493&output=embed"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default GoogleMap;
