import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Faculty, Department, Course } from "../types/academics";
import "bootstrap-icons/font/bootstrap-icons.css";

import Img from "../assets/images/sermon.jpg";
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

import AcademicsInfo from "./academicsInfo";

type Level = "100L" | "200L" | "300L" | "400L" | "500L";
const AcademicsPage: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: facultyData } = await supabase.from("faculties").select("*");
      const { data: deptData } = await supabase.from("departments").select("*");
      const { data: courseData} = await supabase
  .from("courses")
  .select("*, course_materials(*)"); 


      if (facultyData) setFaculties(facultyData);
      if (deptData) setDepartments(deptData);
      if (courseData) setCourses(courseData);

      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleFavorite = (code: string) => {
    setFavorites((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };


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

        <div className="alert alert-info" data-aos="fade-up">
          <strong>Tips:</strong> Select your faculty → department → level to access course materials and past questions. Use the search bar to filter!
        </div>

        <AcademicsInfo
          faculties={faculties}
          departments={departments} 
          courses={courses}  
          selectedFaculty={selectedFaculty}
          setSelectedFaculty={setSelectedFaculty}
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          search={search}
          setSearch={setSearch}
          loading={loading}
          setLoading={setLoading}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
      <Footer />
    </>
  );
};

export default AcademicsPage;
