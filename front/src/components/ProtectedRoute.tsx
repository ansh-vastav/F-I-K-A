// import { useEffect, useState } from "react";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";

// const ProtectedRoute: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     setIsAuthenticated(!!token);

//     if (!token) {
//       navigate("/admin", { replace: true });
//     }
//   }, [navigate]);

//   if (isAuthenticated === null) {
//     return null; // Prevent rendering until auth check is complete
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
// };

// export default ProtectedRoute;
