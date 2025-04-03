import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminNav from './components/AdminNav';
import BlogsManager from './components/BlogsManager';
import ProjectsManager from './components/ProjectsManager';
import TechManager from './components/TechManager';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminToken");
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <BlogsManager />
          <ProjectsManager />
          <TechManager />
        </motion.div>
      </div>
    </div>
  );
}

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAdminStore } from '../../store/adminStore';
// import AdminNav from './components/AdminNav';
// import BlogsManager from './components/BlogsManager';
// import ProjectsManager from './components/ProjectsManager';
// import TechManager from './components/TechManager';

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/admin');
//     }
//   }, [isAuthenticated, navigate]);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <AdminNav />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="space-y-12"
//         >
//           <BlogsManager />
//           <ProjectsManager />
//           <TechManager />
//         </motion.div>
//       </div>
//     </div>
//   );
// }
