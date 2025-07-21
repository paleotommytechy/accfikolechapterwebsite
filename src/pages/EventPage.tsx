// src/pages/EventPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'
import EventCard from "../components/EventCard";
import Img from "../assets/images/agailio.jpg";
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { supabase } from "../lib/supabaseClient"; // 👈 import your supabase client

// Event Type (match your EventCard props)
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url: string;
};

const today = new Date().toISOString().split("T")[0]; // YYYY‑MM‑DD

const EventPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from Supabase and subscribe to real-time updates
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: false });

      if (error) console.error("Error fetching events:", error);
      else setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();

    const channel = supabase
      .channel("realtime-events")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "events",
      }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ Filter into upcoming/past
  const upcomingEvents = events.filter((e) => e.date >= today);
  const pastEvents = events.filter((e) => e.date < today);

  const renderCards = (data: Event[]) => (
    <div className="row mt-4">
      {data.length === 0 && !loading && (
        <p className="text-center text-muted">No events to display.</p>
      )}
      {data.map((event) => (
        <div className="col-md-6 col-lg-4" key={event.id}>
          <EventCard
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            description={event.description}
            image={event.image_url}
          />
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
        <div style={{ margin: '240px 0 0 50px' }}>
          <h1>EVENTS</h1>
          <p>
            <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
            &nbsp;&nbsp;|| &nbsp;&nbsp;
            <Link to='/events' className="text-white fw-bold text-decoration-none fs-6">
              EVENTS
            </Link>
          </p>
        </div>
      </div>

      <div className="container py-5 mt-0" data-aos='fade-down'>

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
