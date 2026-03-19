import { Course } from "@/types/course";

export const courses: Course[] = [
  // IGCSE Courses
  { id: "igcse-1", name: "IGCSE Biology", level: "IGCSE" },
  { id: "igcse-2", name: "IGCSE Business Studies", level: "IGCSE" },
  { id: "igcse-3", name: "IGCSE Chemistry", level: "IGCSE" },
  { id: "igcse-4", name: "IGCSE Computer Science", level: "IGCSE" },
  { id: "igcse-5", name: "IGCSE English - First Language", level: "IGCSE" },
  { id: "igcse-6", name: "IGCSE Environmental Management", level: "IGCSE" },
  { id: "igcse-7", name: "IGCSE Geography", level: "IGCSE" },
  { id: "igcse-8", name: "IGCSE History", level: "IGCSE" },
  { id: "igcse-9", name: "IGCSE Mathematics", level: "IGCSE" },
  { id: "igcse-10", name: "IGCSE Physics", level: "IGCSE" },
  { id: "igcse-11", name: "IGCSE Travel and Tourism", level: "IGCSE" },

  // IELTS Course
  { id: "ielts-1", name: "IELTS Training (English Language Course)", level: "IELTS" },

  // Level 3 Courses
  { id: "l3-1", name: "Level 3 Accountancy", level: "Level 3", credits: "60 Credits" },
  { id: "l3-2", name: "Level 3 Business Management", level: "Level 3", credits: "120 Credits" },
  { id: "l3-3", name: "Level 3 Business Studies", level: "Level 3", credits: "60 Credits" },
  { id: "l3-4", name: "Level 3 Employability and Workplace Skills", level: "Level 3", credits: "60 Credits" },
  { id: "l3-5", name: "Level 3 Engineering", level: "Level 3", credits: "60 Credits" },
  { id: "l3-6", name: "Level 3 Health & Social Care", level: "Level 3" },
  { id: "l3-7", name: "Level 3 Introduction to Management", level: "Level 3", credits: "60 Credits" },
  { id: "l3-8", name: "Level 3 People and Organisations", level: "Level 3", credits: "60 Credits" },
  { id: "l3-9", name: "Level 3 Information Technology", level: "Level 3", credits: "60 Credits" },

  // Level 4 Courses
  { id: "l4-1", name: "Level 4 Accounting and Business", level: "Level 4" },
  { id: "l4-2", name: "Level 4 Business Management", level: "Level 4" },
  { id: "l4-3", name: "Level 4 Entrepreneurship", level: "Level 4" },
  { id: "l4-4", name: "Level 4 Health & Social Care Management", level: "Level 4" },
  { id: "l4-5", name: "Level 4 Tourism and Hospitality Management", level: "Level 4" },
  { id: "l4-6", name: "Level 4 Human Resource Management", level: "Level 4" },
  { id: "l4-7", name: "Level 4 Logistics and Supply Chain Management", level: "Level 4" },
  { id: "l4-8", name: "Level 4 Information Technology", level: "Level 4" },
  { id: "l4-9", name: "Level 4 IT and E-Commerce", level: "Level 4" },
  { id: "l4-10", name: "Level 4 IT and Networking", level: "Level 4" },
  { id: "l4-11", name: "Level 4 IT and Web Design", level: "Level 4" },
  { id: "l4-12", name: "Level 4 Leadership and Teamwork", level: "Level 4" },
  { id: "l4-13", name: "Level 4 Sales and Marketing", level: "Level 4" },

  // Level 5 Courses
  { id: "l5-1", name: "Level 5 Business Management", level: "Level 5" },
  { id: "l5-2", name: "Level 5 Health & Social Care Management", level: "Level 5" },
  { id: "l5-3", name: "Level 5 Tourism & Hospitality Management", level: "Level 5" },
  { id: "l5-4", name: "Level 5 Information Technology", level: "Level 5" },
  { id: "l5-5", name: "Level 5 IT - E-Commerce", level: "Level 5" },
  { id: "l5-6", name: "Level 5 IT - Networking", level: "Level 5" },
  { id: "l5-7", name: "Level 5 IT - Web Design", level: "Level 5" },
  { id: "l5-8", name: "Level 5 Teacher Training", level: "Level 5" },

  // Level 4 & 5 Combined Courses
  { id: "l45-1", name: "Level 4 & 5 Accounting and Business", level: "Level 4 & 5" },
  { id: "l45-2", name: "Level 4 & 5 Business Management", level: "Level 4 & 5" },
  { id: "l45-3", name: "Level 4 & 5 Entrepreneurship and Management", level: "Level 4 & 5" },
  { id: "l45-4", name: "Level 4 & 5 Health & Social Care Management", level: "Level 4 & 5" },
  { id: "l45-5", name: "Level 4 & 5 Tourism and Hospitality Management", level: "Level 4 & 5" },
  { id: "l45-6", name: "Level 4 & 5 Human Resource Management", level: "Level 4 & 5" },
  { id: "l45-7", name: "Level 4 & 5 Logistics and Supply Chain Management", level: "Level 4 & 5" },
  { id: "l45-8", name: "Level 4 & 5 Information Technology", level: "Level 4 & 5" },
  { id: "l45-9", name: "Level 4 & 5 IT and E-Commerce", level: "Level 4 & 5" },
  { id: "l45-10", name: "Level 4 & 5 IT and Networking", level: "Level 4 & 5" },
  { id: "l45-11", name: "Level 4 & 5 IT and Web Design", level: "Level 4 & 5" },
  { id: "l45-12", name: "Level 4 & 5 Leadership and Teamwork", level: "Level 4 & 5" },
  { id: "l45-13", name: "Level 4 & 5 Sales and Marketing", level: "Level 4 & 5" },

  // Level 6 Courses
  { id: "l6-1", name: "Level 6 Business Management", level: "Level 6" },
  { id: "l6-2", name: "Level 6 Professional Sales Management", level: "Level 6" },

  // Level 7 Courses
  { id: "l7-1", name: "Level 7 Human Resource Management", level: "Level 7" },
  { id: "l7-2", name: "Level 7 Strategic Management and Leadership", level: "Level 7" },
  { id: "l7-3", name: "Level 7 Strategic Sales Management", level: "Level 7" },
  { id: "l7-4", name: "Level 7 Project Management", level: "Level 7" },
  { id: "l7-5", name: "Level 7 Organisational Psychology and Business", level: "Level 7" },
];

export const courseLevels = [
  "All",
  "IGCSE",
  "IELTS",
  "Level 3",
  "Level 4",
  "Level 5",
  "Level 4 & 5",
  "Level 6",
  "Level 7",
] as const;
