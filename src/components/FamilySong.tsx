// src/components/FamilySong.tsx
import React from "react";


const FamilySong: React.FC = () => (
  <>
    <style>
      {`
        .fs-section {
          position: relative;
          width: 100%;
          min-height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          z-index: 1;
        }

        .snow-container {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .snowflake {
          position: absolute;
          top: -10px;
          color: white;
          font-size: 1em;
          animation: fall linear infinite;
        }

        @keyframes fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
        }

        .snowflake:nth-child(1)  { left: 5%;  animation-duration: 10s; font-size: 1rem; }
        .snowflake:nth-child(2)  { left: 15%; animation-duration: 12s; font-size: 0.8rem; }
        .snowflake:nth-child(3)  { left: 25%; animation-duration: 14s; font-size: 1.2rem; }
        .snowflake:nth-child(4)  { left: 35%; animation-duration: 11s; font-size: 0.9rem; }
        .snowflake:nth-child(5)  { left: 45%; animation-duration: 13s; font-size: 1rem; }
        .snowflake:nth-child(6)  { left: 55%; animation-duration: 9s;  font-size: 1.3rem; }
        .snowflake:nth-child(7)  { left: 65%; animation-duration: 15s; font-size: 1rem; }
        .snowflake:nth-child(8)  { left: 75%; animation-duration: 10s; font-size: 0.8rem; }
        .snowflake:nth-child(9)  { left: 85%; animation-duration: 12s; font-size: 1.1rem; }
        .snowflake:nth-child(10) { left: 95%; animation-duration: 14s; font-size: 0.9rem; }

        /* Animated Gradient Text & Button */
        @keyframes colorSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .animated-text {
          font-weight: bold;
          background: linear-gradient(to right, #d7dde8, white);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorSlide 10s linear infinite;
        }

        .animated-background{
          color: white;
          border: none;
          font-weight: 600;
          background: linear-gradient(to right top, #a1c4fd, #5f2c82, #49a09d);
          background-size: 300% 100%;
          animation: colorSlide 10s linear infinite;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .animated-background:hover {
          transform: scale(1.05);
        }

      `}
    </style>
    <div className='text-center mb-2 mt-4'>
      <h2 className='text-center text-info fw-bold mb-3'>FAMILY SONG</h2>
    </div>
    <section className="animated-background fs-section" data-aos="zoom-in">
      {/* Snow animation layer */}
      <div className="snow-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="snowflake">❄</div>
        ))}
      </div>

      {/* Content circle */}
      <div className="fs-circle">
        
        <p className="lead mt-3 animated-text fw-bold">
          We are Family of God<br/> We are Family of God<br/><br/>A Fellowship with a difference<br/>We are Family of God<br/><br/>We Preach, Teach and Pray.<br/>We are Family of God<br/><br/>
          We are heirs of the Father, we are jointed, We are one, Amen.<br/>We are Children of the kingdom, We are Family, We are one
        </p>
        <h4 className='animated-text fw-bold text-center mb-5'>ACCF!!!<br/>A FELLOWSHIP WITH A DIFFERENCE<br/><br/>ACCF!!!<br/>WE PREACH, TEACH AND PRAY<br/></h4>
      </div>
    </section>
  </>
);

export default FamilySong;
