export interface Course {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  instructor: Teacher;
  lectures: Lecture[];
}

export interface Lecture {
  id: number;
  title: string;
  description: string;
  duration: string;
  filesCount: number;
  videoUrl: string;
  homeworkUrl: string;
  quizUrl: string;
  downloadUrl?: string;
}

export interface Subject {
  id: string;
  name: string;
  image: string;
  courses: Course[];
}

export type GradeLevel = '1' | '2' | '3';

export interface Grade {
  id: GradeLevel;
  name: string;
  image: string;
  subjects: Subject[];
}

export interface Teacher {
  id: string;
  name: string;
  image: string;
  specialization: string;
  experience: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}