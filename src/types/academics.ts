export interface Faculty {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  faculty_id: string;
}

export interface Course {
  id: string;
  name: string;
  department_id: string;
  level: '100L' | '200L' | '300L' | '400L' | '500L';
  tags: string[];
}

export interface CourseMaterial {
  id: string;
  course_id: string;
  title: string;
  type: 'material' | 'past-question';
  file_url: string;
}
