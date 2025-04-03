import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type Blog = {
  id: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
  slug: string;
};

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // useEffect(() => {
  //   fetch('https://ansh-portfolio.onrender.com/api/blogs')
  //     .then((response) => response.json())
  //     .then((data: Blog[]) => setBlogs(data))
  //     .catch((error) => console.error('Error fetching blogs:', error));
  // }, []);
  useEffect(() => {
    fetch('https://ansh-portfolio.onrender.com/api/blogs')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Blog[]) => {
        console.log('Fetched Blogs:', data); // Debugging Log
        setBlogs(data);
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);
  

  return (
    <div className="pt-16 min-h-screen bg-fixed bg-cover bg-center" >
      {/* style={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80")'
    }} */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
            <Link
          to="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white mb-8">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <Calendar size={16} className="mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  to={`${post.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
