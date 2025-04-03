import { Book, Briefcase, Code } from 'lucide-react';
import HomeCarousel from '../components/HomeCarousel';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80")'
    }}>
      <HomeCarousel />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.h2
          variants={item}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          Explore My Work
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={item} className="h-[500px]">
            <Card
              title="Blog Posts"
              description="Dive into my technical articles covering web development, software architecture, and industry best practices."
              icon={<Book />}
              to="/blogs"
              defaultImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              hoverImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            />
          </motion.div>
          
          <motion.div variants={item} className="h-[500px]">
            <Card
              title="Portfolio"
              description="Explore my latest projects showcasing modern web applications built with cutting-edge technologies."
              icon={<Briefcase />}
              to="/portfolio"
              defaultImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              hoverImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            />
          </motion.div>
          
          <motion.div variants={item} className="h-[500px]">
            <Card
              title="Technologies"
              description="Discover the tech stack I specialize in, from front-end frameworks to back-end technologies."
              icon={<Code />}
              to="/tech"
              defaultImage="https://images.unsplash.com/photo-1504639725590-34d0984388bd"
              hoverImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}