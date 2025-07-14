import React, { useState } from "react";
import { faculties} from "../data/academics";
import type { Faculty, Department, Course, Level } from "../data/academics";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "bootstrap-icons/font/bootstrap-icons.css";

import Img from "../assets/images/sermon.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const levels: Level[] = ["100L", "200L", "300L", "400L", "500L"];

// Tips banner
const TipsBanner = () => (
  <div className="alert alert-info" data-aos="fade-up">
    <strong>Tips:</strong> Select your faculty → department → level to access course materials and past questions. Use the search bar to filter!
  </div>
);

// Faculty selector
const FacultySelector: React.FC<{
  faculties: Faculty[];
  selected: Faculty | null;
  onSelect: (f: Faculty) => void;
}> = ({ faculties, selected, onSelect }) => (
  <div className="mb-4">
    <h5>Select a Faculty</h5>
    <div className="d-flex flex-wrap gap-3">
      {faculties.map((f) => (
        <button
          key={f.name}
          className={`btn btn-sm ${selected?.name === f.name ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onSelect(f)}
        >
          {f.name}
        </button>
      ))}
    </div>
  </div>
);

// Department selector
const DepartmentSelector: React.FC<{
  departments: Department[];
  selected: Department | null;
  onSelect: (d: Department) => void;
}> = ({ departments, selected, onSelect }) => (
  <div className="mb-4">
    <h5>Select a Department</h5>
    <div className="d-flex flex-wrap gap-3">
      {departments.map((d) => (
        <button
          key={d.name}
          className={`btn btn-sm ${selected?.name === d.name ? "btn-success" : "btn-outline-success"}`}
          onClick={() => onSelect(d)}
        >
          {d.name}
        </button>
      ))}
    </div>
  </div>
);

// Level selector
const LevelSelector: React.FC<{
  duration: 4 | 5;
  selected: Level | null;
  onSelect: (l: Level) => void;
}> = ({ duration, selected, onSelect }) => (
  <div className="mb-4">
    <h5>Select Level</h5>
    <div className="d-flex gap-2 flex-wrap">
      {levels.slice(0, duration).map((lvl) => (
        <button
          key={lvl}
          className={`btn btn-sm ${selected === lvl ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => onSelect(lvl)}
        >
          {lvl}
        </button>
      ))}
    </div>
  </div>
);

// Course card
const CourseCard: React.FC<{
  course: Course;
  isFavorite: boolean;
  toggleFavorite: (code: string) => void;
}> = ({ course, isFavorite, toggleFavorite }) => (
  <div className="card shadow-sm h-100" data-aos="zoom-in">
    <div className="card-body">
      <h6 className="fw-bold d-flex justify-content-between align-items-center">
        {course.code} – {course.title}
        <button
          className="btn btn-sm"
          onClick={() => toggleFavorite(course.code)}
          title="Bookmark this course"
        >
          {isFavorite ? <AiFillHeart className="text-danger" /> : <AiOutlineHeart />}
        </button>
      </h6>
      <ul className="list-unstyled mt-3 mb-0">
        {course.materials.map((mat, i) => (
          <li
            key={i}
            className="d-flex justify-content-between align-items-center mb-2"
          >
            <span className="badge bg-info text-dark">{mat.type}</span>
            <a
              className="btn btn-sm btn-outline-primary"
              href={mat.fileUrl}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const AcademicsPage: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleFavorite = (code: string) => {
    setFavorites((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const filteredCourses = selectedDept && selectedLevel
    ? selectedDept.coursesPerLevel[selectedLevel].filter(
        (course) =>
          course.code.toLowerCase().includes(search.toLowerCase()) ||
          course.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

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

      }}
      data-aos='fade-up'
      >
      <div style={{margin:'240px 0 0 50px'}}>
        <h1>ACADEMICS</h1>
        <p>
          <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
          &nbsp;&nbsp;|| &nbsp;&nbsp;
          <Link to='/academics' className="text-white fw-bold text-decoration-none fs-6">
           ACADEMICS
          </Link>
        </p>
      </div>
    </div>
    <div className="container py-5">
      <h2 className="text-center mb-4" data-aos="fade-down">
        Academic Resources
      </h2>

      <TipsBanner />

      <FacultySelector
        faculties={faculties}
        selected={selectedFaculty}
        onSelect={(f) => {
          setSelectedFaculty(f);
          setSelectedDept(null);
          setSelectedLevel(null);
        }}
      />

      {selectedFaculty && (
        <DepartmentSelector
          departments={selectedFaculty.departments}
          selected={selectedDept}
          onSelect={(d) => {
            setSelectedDept(d);
            setSelectedLevel(null);
          }}
        />
      )}

      {selectedDept && (
        <LevelSelector
          duration={selectedDept.duration}
          selected={selectedLevel}
          onSelect={(l) => setSelectedLevel(l)}
        />
      )}

      {selectedLevel && selectedDept && (
        <>
          <div className="mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search by course code or title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setLoading(true);
                setTimeout(() => setLoading(false), 400);
              }}
            />
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-5" data-aos="zoom-in">
              <img
                src="/assets/empty-box.svg"
                alt="No result"
                width="120"
                className="mb-3"
              />
              <p className="text-muted">No course found for your search/filter.</p>
            </div>
          ) : (
            <div className="row">
              {filteredCourses.map((course) => (
                <div className="col-md-6 col-lg-4 mb-4" key={course.code}>
                  <CourseCard
                    course={course}
                    isFavorite={favorites.includes(course.code)}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    <Footer />
    </>
  );
};

export default AcademicsPage;
