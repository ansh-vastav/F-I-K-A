import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function AdminNav() {
  const navigate = useNavigate();
   const { theme, toggleTheme } = useTheme();

   const handleLogout = async () => {
    try {
        const response = await fetch("https://ansh-portfolio.onrender.com/api/admin/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (data.success) {
            localStorage.removeItem("adminToken"); // Clear stored token
            toast.success(data.message || "Logout successful!", { position: "top-right" }); 
            navigate("/"); // Redirect to login page
        } else {
            toast.error("Logout failed!", { position: "top-right" });
        }
    } catch (error) {
        console.error("Logout error:", error);
        toast.error("An error occurred. Please try again!", { position: "top-right" });
    }
};

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center">

          <button
              onClick={toggleTheme}
              className="p-2 rounded-lg md:mr-8 mr-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
             onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}