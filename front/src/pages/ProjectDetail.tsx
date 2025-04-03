import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`https://ansh-portfolio.onrender.com/api/portfolios`);
        const foundProject = data.find((p) => p.slug === slug);
        setProject(foundProject);
      } catch (err) {
        setError("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center text-xl text-gray-900 dark:text-white">Loading...</div>;
  }

  if (error || !project) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <Link
          to="/portfolio"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Portfolio
        </Link>

        <motion.img
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Github size={20} className="mr-2" />
              View Source
              <ExternalLink size={16} className="ml-2" />
            </a>
            {/* <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Code size={20} className="mr-2" />
              Live Demo
              <ExternalLink size={16} className="ml-2" />
            </a> */}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
