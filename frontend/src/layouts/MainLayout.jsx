import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MainLayout({ children }) {
  const { isAuthenticated, role, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-lg font-bold mb-6">
          Online Learning Platform
        </h1>

        {!loading && !isAuthenticated && (
          <>
            <Link to="/login" className="mb-3 hover:underline">Login</Link>
            <Link to="/register" className="mb-3 hover:underline">Register</Link>
            <Link to="/courses" className="hover:underline">Courses</Link>
          </>
        )}

        {!loading && isAuthenticated && role === "Student" && (
          <>
            <Link to="/student/dashboard" className="mb-3 hover:underline">
              Dashboard
            </Link>
            <Link to="/courses" className="mb-3 hover:underline">
              Courses
            </Link>
            <Link to="/certificates" className="mb-3 hover:underline">
              Certificates
            </Link>
          </>
        )}

        {!loading && isAuthenticated && role === "Instructor" && (
          <>
            <Link to="/instructor/dashboard" className="mb-3 hover:underline">
              Instructor Dashboard
            </Link>
            <Link to="/courses" className="mb-3 hover:underline">
              Courses
            </Link>
          </>
        )}

        <div className="mt-auto">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
