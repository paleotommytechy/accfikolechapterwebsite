import React from "react";
import type { Faculty, Department, Course } from "../types/academics";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type Level = "100L" | "200L" | "300L" | "400L" | "500L";
type Material = {
  id: string;
  title: string;
  file_url: string;
  type: string;
  course_id: string;
};

type CourseWithMaterials = Course & {
  course_materials?: Material[];
};


interface Props {
  faculties: Faculty[];
  courses: Course[];
  departments: Department[];
  selectedFaculty: Faculty | null;
  setSelectedFaculty: (faculty: Faculty | null) => void;
  selectedDept: Department | null;
  setSelectedDept: (dept: Department | null) => void;
  selectedLevel: Level | null;
  setSelectedLevel: (level: Level | null) => void;
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  favorites: string[];
  toggleFavorite: (code: string) => void;
}

const levels: Level[] = ["100L", "200L", "300L", "400L", "500L"];

const AcademicsInfo: React.FC<Props> = (props) => {
  const {
    faculties,
    courses,
    departments,
    selectedFaculty,
    setSelectedFaculty,
    selectedDept,
    setSelectedDept,
    selectedLevel,
    setSelectedLevel,
    search,
    setSearch,
    loading,
    favorites,
    toggleFavorite,
  } = props;

  
  const filteredCourses = courses.filter(
  (course) =>
    course.department_id === selectedDept?.id &&
    course.level === selectedLevel &&
    (course.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))||
     course.name.toLowerCase().includes(search.toLowerCase()))
);

  

  return (
    <div className="card p-4 mt-3" data-aos="fade-up">
      <div className="mb-3">
        <label className="form-label">Select Faculty</label>
        <select
          className="form-select"
          value={selectedFaculty?.id || ""}
          onChange={(e) => {
            const faculty = faculties.find((f) => f.id === e.target.value);
            setSelectedFaculty(faculty || null);
            setSelectedDept(null);
            setSelectedLevel(null);
          }}
        >
          <option value="">-- Choose Faculty --</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </select>
      </div>

      {selectedFaculty && (
        <div className="mb-3">
          <label className="form-label">Select Department</label>
          <select
            className="form-select"
            value={selectedDept?.id || ""}
            onChange={(e) => {
              const dept = departments.find((d) => d.id === e.target.value && d.faculty_id === selectedFaculty.id
            );
              setSelectedDept(dept || null);
              setSelectedLevel(null);
            }}
          >
            <option value="">-- Choose Department --</option>
            {departments
              .filter((d) => d.faculty_id === selectedFaculty.id)
              .map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
            ))}
          </select>
        </div>
      )}

      {selectedDept && (
        <div className="mb-3">
          <label className="form-label">Select Level</label>
          <select
            className="form-select"
            value={selectedLevel || ""}
            onChange={(e) => setSelectedLevel(e.target.value as Level)}
          >
            <option value="">-- Choose Level --</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedDept && selectedLevel && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search course by code or title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading && <div className="text-center">Loading...</div>}

      {filteredCourses.length > 0 && (
        <div className="list-group">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>
                  {course.tags}: {course.name}
                </h5>
                <ul className="mb-0">
                  {(course as CourseWithMaterials).course_materials?.map((mat) => (
                  <li key={mat.id}>
                    <a href={mat.file_url} target="_blank" rel="noreferrer">
                      {mat.title} ({mat.type})
                    </a>
                  </li>
                ))}


                </ul>
              </div>
              <div
                onClick={() => toggleFavorite(course.id)}
                style={{ cursor: "pointer" }}
              >
                {favorites.includes(course.id) ? (
                  <AiFillHeart color="red" size={24} />
                ) : (
                  <AiOutlineHeart size={24} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDept && selectedLevel && filteredCourses.length === 0 && (
        <div className="text-center text-muted">
          No courses found for this selection.
        </div>
      )}
    </div>
  );
};

export default AcademicsInfo;
