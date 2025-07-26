import { useState } from 'react';
import '../assets/styles/NavBar.css'
import { Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import {FaSearch, FaHome, FaInfoCircle, FaBookOpen, FaCalendarAlt, FaBlog, FaGraduationCap, FaImages, FaEnvelope} from 'react-icons/fa'
// import ThemeToggle from '../hooks/ThemeToggle'

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const menuStyle: React.CSSProperties = {
    backgroundColor: hover || sidebarOpen ? 'white' : 'mediumpurple',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    padding: '10px',
    color: hover|| sidebarOpen ? 'black': 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <>
    <nav className="navbar navbar-dark bg-transparent position-absolute top-0 w-100 z-3 py-3 px-3">
      <Container> 
        <Link className="navbar-brand text-white logo" to="/">
          <img src={logo} alt="ACCF Logo" height='50' className="me-2 " />
        </Link>
        <button
          style={menuStyle}
          className="d-lg-none"
          onClick={toggleSidebar}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)} >
          <i className="bi bi-list fs-4"></i>
        </button>
        <div className="d-none d-lg-flex">
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center gap-3">
            <li className="nav-item" ><Link className="nav-link" to="">Home</Link></li>
            <li className="nav-item" ><Link className="nav-link" to="/about"> About</Link></li>
            <li className="nav-item" ><Link className="nav-link" to="/sermons">Sermons</Link></li>
            <li className="nav-item" ><Link className="nav-link" to="/events">Events</Link></li>
            <li className="nav-item"> <Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"> <Link className="nav-link" to="/academics">Academics</Link></li>
            <li className="nav-item"> <Link className="nav-link" to="/gallery">Gallery</Link></li>
            <li className="nav-item"> <Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"> <Link className="nav-link btn btn-outline-primary ms-2" to="/donate">Donate</Link></li>
          </ul>
        </div>
      </Container>
    </nav>
       {/* Sidebar */}
       {sidebarOpen && (
        <div
          className="d-flex flex-column bg-dark text-white top-0 end-0 vh-100 shadow-lg z-3 p-4 position-fixed "
          style={{
            width: '260px',
            transition: 'transform 0.3s ease-in-out',
            color: 'gray',
          }}
        >
          <button
            className="btn text-white position-absolute mt-0 top-0 end-0 m-3"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg fs-4"></i>
          </button>
          

          <nav className="mobile-navbar mt-4">
            <div className='p-2'>
              <div className='input-group bg-dark rounded mb-3'>
                <span className='input-group-text bg-secondary border-0 text-white'><FaSearch /></span>
                <input type="text" className='form-control bg-secondary border-0 text-white' placeholder="Search...." />
              </div>
            </div>
            <ul className="navbar-nav d-flex flex-column gap-3">
              <li className="nav-item link-to-page">
               <Link className="nav-link text-white" to="/" onClick={toggleSidebar}><FaHome/> Home</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/about" onClick={toggleSidebar}><FaInfoCircle/> About Us</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/sermons" onClick={toggleSidebar}><FaBookOpen/> Sermons</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/events" onClick={toggleSidebar}><FaCalendarAlt/> Events</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/blog" onClick={toggleSidebar}><FaBlog/> Blog</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/academics" onClick={toggleSidebar}><FaGraduationCap/> Academics</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/gallery" onClick={toggleSidebar}><FaImages/> Gallery</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/contact" onClick={toggleSidebar}><FaEnvelope/> Contact</Link>
              </li>
              <li className="nav-item link-to-page">
                <Link className="nav-link text-white" to="/donate" onClick={toggleSidebar}><FaEnvelope/> Donations</Link>
              </li>
              
              <li className="nav-item d-flex gap-3 mt-2">
                <a className="text-white fs-5" href="https://www.facebook.com/profile.php?id=61560232723803" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
                <a className="text-white fs-5" href="https://www.instagram.com/accf_ikole_chapter?igsh=YzljYk1ODg3Zg==" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
                <a className="text-white fs-5" href="https://t.me/+2qOc-V6sx6g0MzM0" target="_blank" rel="noreferrer"><i className="bi bi-telegram"></i></a>
                <a className="text-white fs-5" href="https://youtube.com" target="_blank" rel="noreferrer"><i className="bi bi-youtube"></i></a>
                <a className="text-white fs-5" href="https://x.com" target="_blank" rel="noreferrer"><i className="bi bi-twitter"></i></a>
              </li>
             {/* <li className="nav-item mt-0 mx-3">
                <ThemeToggle />
              </li>
*/}            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
