import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "Instructor") {
    return <Navigate to="/instructor/dashboard" replace />;
  }

  return <Navigate to="/student/dashboard" replace />;
}

export default HomeRedirect;
