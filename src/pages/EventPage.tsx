// src/pages/EventPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'
import EventCard from "../components/EventCard";
import Img from "../assets/images/agailio.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { events } from '../data/events';


const today = new Date().toISOString().split("T")[0]; // YYYY‑MM‑DD

const EventPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  // Tab state: "upcoming" | "past"
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingEvents = events.filter(e => e.date >= today);
  const pastEvents     = events.filter(e => e.date <  today);

  const renderCards = (data: typeof events) => (
    <div className="row mt-4">
      {data.length === 0 && (
        <p className="text-center text-muted">No events to display.</p>
      )}
      {data.map((event, idx) => (
        <div className="col-md-6 col-lg-4" key={idx}>
          <EventCard {...event} />
        </div>
      ))}
    </div>
  );

  return (
    <>
    <Navbar />
    <div 
        className="d-flex align-items-center text-white z-1 mb-0"
        style={{
          position: 'relative',
          height: '50vh',
          background: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'center',
          borderRadius: '0 0 15px 15px'
        }}>
      <p className=''style={{margin:'240px 0 0 50px'}}>
        <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
        &nbsp;&nbsp;|| &nbsp;&nbsp;
        <Link to='/events' className="text-white fw-bold text-decoration-none fs-6">
          EVENTS
        </Link>
      </p>
    </div>
    <div className="container py-5 mt-0">
      
      {/* -------- Bootstrap Nav Tabs -------- */}
      <ul className="nav nav-tabs justify-content-center mt-0" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
            role="tab"
          >
            Upcoming
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
            role="tab"
          >
            Past
          </button>
        </li>
      </ul>
      {/* ------------------------------------ */}

      {/* Tab panes */}
      {activeTab === "upcoming" ? renderCards(upcomingEvents) : renderCards(pastEvents)}
    </div>
    <Footer />
    </>
  );
};

export default EventPage;
