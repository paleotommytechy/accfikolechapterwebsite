// src/components/Common/Loader.tsx
import React from "react";
import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper d-flex justify-content-center align-items-center">
      <div className="lds-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
};

export default Loader;
