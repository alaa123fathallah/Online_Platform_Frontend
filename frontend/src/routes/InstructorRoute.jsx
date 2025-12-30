import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function InstructorRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user?.role !== "Instructor") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default InstructorRoute;
