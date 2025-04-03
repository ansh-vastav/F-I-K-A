export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  slug: string;
  features?: string[];
  technicalDetails?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  slug: string;
}

export interface Technology {
  id: number;
  name: string;
  icon: string;
  description: string;
  proficiency: number;
}