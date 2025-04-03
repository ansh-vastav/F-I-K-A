import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  defaultImage: string;
  hoverImage: string;
}

export default function Card({ title, description, icon, to, defaultImage, hoverImage }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={to} className="block h-full">
        <div className="relative h-full">
          <motion.div
            className="absolute inset-0 bg-center bg-cover"
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundImage: `url(${defaultImage})` }}
          />
          <motion.div
            className="absolute inset-0 bg-center bg-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundImage: `url(${hoverImage})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-70" />
          <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
            <div className="text-4xl text-white mb-4">
              {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              {title}
            </h3>
            <p className="text-gray-200">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}