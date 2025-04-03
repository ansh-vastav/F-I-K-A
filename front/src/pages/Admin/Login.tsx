// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Lock } from "lucide-react";
// import toast from "react-hot-toast";

// const AdminLogin: React.FC = () => {
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem("adminToken");
//     if (isAuthenticated) {
//       navigate("/admin/dashboard", { replace: true }); // Redirect if already logged in
//     }
//   }, [navigate]);

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (password === "123456") {
//       localStorage.setItem("adminToken", "true"); // Set token in localStorage
//       toast.success("Login successful!");
//       navigate("/admin/dashboard", { replace: true }); // Redirect to dashboard
//     } else {
//       toast.error("Invalid password. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <div className="flex justify-center mb-8">
//           <Lock className="w-12 h-12 text-blue-600 dark:text-blue-400" />
//         </div>
//         <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
//           Admin Login
//         </h1>
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full rounded-md border border-black bg-gray-100 shadow-sm focus:ring-blue-500 focus:border-black dark:bg-gray-700 dark:border-black dark:text-white"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminLogin;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminToken");
    if (isAuthenticated) {
      navigate("/admin/dashboard"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ansh-portfolio.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login successful!");
        navigate("/admin/dashboard"); // Redirect to dashboard
      } else {
        toast.error("Invalid password. Try again.");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Lock className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-black bg-gray-100 shadow-sm focus:ring-blue-500 focus:border-black dark:bg-gray-700 dark:border-black dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
