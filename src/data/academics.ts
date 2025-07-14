// data/academics.ts

export type CourseMaterial = {
  type: "material" | "past-question";
  title: string;
  fileUrl: string;
};

export type Course = {
  code: string;
  title: string;
  materials: CourseMaterial[];
  tags?: string[]; // e.g., ['core', 'engineering', 'math']
};

export type Level = "100L" | "200L" | "300L" | "400L" | "500L";

export type Department = {
  name: string;
  duration: 4 | 5;
  coursesPerLevel: Record<Level, Course[]>;
};

export type Faculty = {
  name: string;
  departments: Department[];
};

export const faculties: Faculty[] = [
  {
    name: "Engineering",
    departments: [
      {
        name: "Computer Engineering",
        duration: 5,
        coursesPerLevel: {
          "100L": [
            {
              code: "CPE101",
              title: "Introduction to Computer Engineering",
              materials: [
                {
                  type: "material",
                  title: "Lecture Note",
                  fileUrl: "/files/cpe101-lecture.pdf",
                },
                {
                  type: "past-question",
                  title: "2019 PQ",
                  fileUrl: "/files/cpe101-2019.pdf",
                },
              ],
            },
          ],
          "200L": [],
          "300L": [],
          "400L": [],
          "500L": [],
        },
      },
      // Add more engineering depts
    ],
  },
  {
    name: "Environmental Sciences",
    departments: [
      {
        name: "Architecture",
        duration: 4,
        coursesPerLevel: {
          "100L": [],
          "200L": [],
          "300L": [],
          "400L": [],
          "500L": [],
        },
      },
    ],
  },
  {
    name: "Agricultural Sciences",
    departments: [
      {
        name: "Animal Production and Health",
        duration: 4,
        coursesPerLevel: {
          "100L": [],
          "200L": [],
          "300L": [],
          "400L": [],
          "500L": [],
        },
      },
    ],
  },
];
