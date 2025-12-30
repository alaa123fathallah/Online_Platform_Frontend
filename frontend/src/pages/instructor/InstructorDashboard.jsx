import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/courses/my");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load instructor courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="w-full min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{courses.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Total Students</h2>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Published Quizzes</h2>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Courses</h2>

          <Link
            to="/instructor/create-course"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Create Course
          </Link>
        </div>

        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <ul className="space-y-3">
            {courses.map((course) => (
              <li
                key={course.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{course.title}</span>

                <div className="space-x-3">
                  <Link
                    to={`/instructor/courses/${course.id}/edit`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/instructor/courses/${course.id}/lessons`}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Lessons
                  </Link>

                  {/* ✅ NEW */}
                  <Link
                    to={`/instructor/courses/${course.id}/quizzes`}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Quizzes
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;
