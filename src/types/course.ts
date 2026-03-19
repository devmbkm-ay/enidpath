export type CourseLevel = 
  | "IGCSE" 
  | "IELTS" 
  | "Level 3" 
  | "Level 4" 
  | "Level 5" 
  | "Level 4 & 5" 
  | "Level 6" 
  | "Level 7";

export interface Course {
  id: string;
  name: string;
  level: CourseLevel;
  credits?: string;
}
