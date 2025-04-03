import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://ansh-portfolio.onrender.com/api/blogs`)
      .then((response) => response.json())
      .then((data) => {
        const blogPost = data.find(blog => blog.slug === slug);
        setPost(blogPost);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Blog post not found</h1>
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
          to="/blogs"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Blogs
        </Link>

        <motion.img
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
            <Calendar size={16} className="mr-2" />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {post.excerpt}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-300 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
