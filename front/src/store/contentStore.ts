import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogPost, Project, Technology } from '../types';

interface ContentState {
  blogs: BlogPost[];
  projects: Project[];
  technologies: Technology[];
  addBlog: (blog: BlogPost) => void;
  updateBlog: (id: number, blog: BlogPost) => void;
  deleteBlog: (id: number) => void;
  addProject: (project: Project) => void;
  updateProject: (id: number, project: Project) => void;
  deleteProject: (id: number) => void;
  addTechnology: (tech: Technology) => void;
  updateTechnology: (id: number, tech: Technology) => void;
  deleteTechnology: (id: number) => void;
}

const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a new React project with TypeScript and understand the basics of type safety in your components.",
    content: `TypeScript has become an essential tool in modern React development...`,
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    slug: "getting-started-react-typescript"
  },
  // Add more initial blogs...
];

const initialProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    link: "https://github.com/yourusername/ecommerce",
    slug: "ecommerce-platform"
  },
  // Add more initial projects...
];

const initialTechnologies: Technology[] = [
  {
    id: 1,
    name: "React",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    description: "A JavaScript library for building user interfaces",
    proficiency: 90
  },
  // Add more initial technologies...
];

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      blogs: initialBlogs,
      projects: initialProjects,
      technologies: initialTechnologies,
      addBlog: (blog) =>
        set((state) => ({ blogs: [...state.blogs, blog] })),
      updateBlog: (id, blog) =>
        set((state) => ({
          blogs: state.blogs.map((b) => (b.id === id ? blog : b)),
        })),
      deleteBlog: (id) =>
        set((state) => ({
          blogs: state.blogs.filter((b) => b.id !== id),
        })),
      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? project : p)),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
      addTechnology: (tech) =>
        set((state) => ({ technologies: [...state.technologies, tech] })),
      updateTechnology: (id, tech) =>
        set((state) => ({
          technologies: state.technologies.map((t) => (t.id === id ? tech : t)),
        })),
      deleteTechnology: (id) =>
        set((state) => ({
          technologies: state.technologies.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'content-storage',
    }
  )
);