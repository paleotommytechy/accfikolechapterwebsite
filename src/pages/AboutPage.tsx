// src/pages/AboutPage.tsx
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'
import Section from "../components/About/Section";
import PastorCard from "../components/About/PastorCard";
import ExecutiveCard from "../components/About/ExecutiveCard";
import { pastor, executives } from '../data/ExecutivesDetails';
import Img from "../assets/images/agailio.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import FamilySong from "../components/FamilySong"

const AboutPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return(
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
      <div style={{margin:'240px 0 0 50px'}}>
        <h1>ABOUT US</h1>
        <p>
          <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
          &nbsp;&nbsp;|| &nbsp;&nbsp;
          <Link to='/about' className="text-white fw-bold text-decoration-none fs-6">
            ABOUT US 
          </Link>
        </p>
      </div>
    </div>
    <div className="container py-5 px-3"> 
        <div data-aos="fade-up" data-aos-delay="100" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-0">A BRIEF HISTORY ABOUT THE MINISTRY AND THE STUDENT WING</h2>
          <small className="mx-5 text-center text-muted"><i>An extraction from All Christian Fellowship Ministry Articles of faith</i></small><br/><br/>
          <p className="text-center mx-auto " style={{ maxWidth: '800px' }}>
            The Ministry has a unique beginning in that she evolved out of the three district and independently organised fellowship groups which decided to fuse together to form the erstwhile "All Christian Fellowship Group" which was later christened All Christian Fellowship Ministry.<br/><br/>

            The name was formed by the coming together of three groups viz:<br/><br/>
            1. Christian Fellowship Group Ikole Ekiti<br/><br/>2. Christian Fellowship Group Aisegba Ekiti<br/><br/>3. Akoko Christian Fellowship Group Ikare<br/><br/>

            All Christian Fellowship Ministry is devoid of a single founder. It is a ministry with a different, it was the initiatives and efforts of the leaders of those three groups that gave birth to this ministry. The pre-occupation of these groups was to win as many souls as possible into the kingdom of God.<br/><br/>

            It was in 1977 that the Ikole Christian Fellowship Group organized a 7-day retreat and invited some leaders and members of the Aisegba and Akoko Christian Fellowship Group. The successful working together of these 3 groups led the leaders to agree to come together.<br/><br/>

            The vision of the Ministry is encompassed in the two arm of the Great Commission of Jesus Christ namely:<br/><br/>

            a. Mark 16:15 Go ye into the world preach the gospel<br/><br/>

            b. Matt. 28:19-20

            Go ye therefore, and teach all nations...... teaching them to observe all things......<br/>

            These verses formed her motto we preach, teach and pray.<br/><br/>

            Thus, Evangelism and sound teaching of the word that are backed up with aggressive prayers which have the efficacy to affect the lives of the believers both spiritually and physically as well as sustaining the various activities of the ministry is the driving force

          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">Our Core Values</h2>
          <ul className="list-group list-group-flush mx-auto text-center" style={{ maxWidth: '600px' }}>
            <li className="list-group-item bg-transparent ">Faith in Jesus Christ</li>
            <li className="list-group-item bg-transparent ">Sound Biblical Teaching</li>
            <li className="list-group-item bg-transparent ">Fellowship & Unity</li>
            <li className="list-group-item bg-transparent ">Prayer & Evangelism</li>
            <li className="list-group-item bg-transparent ">Leadership Development</li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="300" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">What We Believe</h2>
          <p className="lead  text-center mx-auto" style={{ maxWidth: '800px' }}>
            We believe in the infallible Word of God, the Trinity, salvation by grace through faith in Christ, and the empowerment of the Holy Spirit for daily Christian living.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" className="mb-5">
          <h2 className="text-center text-info fw-bold mb-3">Mission & Vision</h2>
          <p className=" text-center mx-auto " style={{ maxWidth: '800px' }}>
            <strong>Our Mission:</strong> We embark on crusade and public rallies all over the campuses to evangelize. We also embark on evangelism by:<br/><br/>

              Personal contact<br/><br/>

              House to house<br/><br/>

              Hospital visitation<br/><br/>

              House fellowship<br/><br/>

              Prison visitation<br/><br/>

              Rural and urban soul winning outreaches<br/><br/>

              We also organize conferences to teach the sound doctrine of the word of God and raise faithful men to take over leadership positions in the mother fellowship.<br/><br/>
            <strong>Our Vision:</strong> Our vision is similar to that to that of our mother fellowship.<br/>

              Our vision is to go into (all the campuses in) the world and preach the gospel to every creature. Mark 16:15b<br/>Go ye therefore, and teach all nations.... teaching them to observe all things.. Mathew 28:19-20<br/><br/>

              <b>We preach, teach.and prayer</b><br/>

              Evangelism - sound teaching - aggressive prayers.<br/>

              <b>Other parts of our vision are:</b><br/><br/>

              To stand different; to deny ungodliness and worldliness in our campusęs Titus 2:11-12<br/><br/>

              To cause the will of God to reign in the heart of every undergraduate in every nation Heb 10:7-9<br/><br/>

              To be a role model to other Christian bodies on campuses in all manners.<br/><br/>

              To raise faithful men as leaders both in secular and spiritual sectors.<br/><br/>

              To depopulate hell and raise candidates for heaven.<br/><br/>
          </p>
        </div>
      <div className="mb-5">
        <FamilySong />
      </div>
       
      <Section title="Meet Our Pastor">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <PastorCard pastor={pastor} />
          </div>
        </div>
      </Section>

      <Section title="Meet Our Executives">
        <div className="row gy-4">
          {executives.map((exec, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <ExecutiveCard exec={exec} />
            </div>
          ))}
        </div>
      </Section>
    </div>
    <Footer />
    </>
  );
};

export default AboutPage;
