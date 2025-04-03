import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import clsx from "clsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="flex flex-col space-y-4 p-4">
            <NavLinks onClick={() => setIsOpen(false)} />
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* 🔹 NavLinks Component */
const NavLinks: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <>
    {["/", "/portfolio", "/contact"].map((path, index) => {
      const labels = ["Home", "Portfolio", "Contact"];
      return (
        <NavLink
          key={path}
          to={path}
          onClick={onClick}
          className={({ isActive }) =>
            clsx(
              "px-3 py-2 rounded-md text-sm font-medium",
              isActive
                ? "bg-gray-900 text-white dark:bg-gray-700"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            )
          }
        >
          {labels[index]}
        </NavLink>
      );
    })}
  </>
);

/* 🔹 Theme Toggle Button */
const ThemeToggleButton: React.FC<{ theme: string; toggleTheme: () => void }> = ({
  theme,
  toggleTheme,
}) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
  >
    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);
