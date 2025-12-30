import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/enrollments/my");
        setEnrollments(res.data);
      } catch (err) {
        console.error("Failed to load enrollments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  const totalCompletedLessons = enrollments.reduce(
    (sum, e) => sum + e.completedLessons,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Student Dashboard
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">
            Enrolled Courses
          </h2>
          <p className="text-3xl font-bold mt-2">
            {enrollments.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">
            Completed Lessons
          </h2>
          <p className="text-3xl font-bold mt-2">
            {totalCompletedLessons}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">
            Average Progress
          </h2>
          <p className="text-3xl font-bold mt-2">
            {enrollments.length === 0
              ? "0%"
              : Math.round(
                  enrollments.reduce(
                    (sum, e) => sum + e.progressPercent,
                    0
                  ) / enrollments.length
                ) + "%"}
          </p>
        </div>
      </div>

      {/* My Courses */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          My Courses
        </h2>

        {loading ? (
          <p>Loading courses...</p>
        ) : enrollments.length === 0 ? (
          <p className="text-gray-500">
            You are not enrolled in any courses yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {enrollments.map((enrollment) => (
              <li
                key={enrollment.enrollmentId}
                className="flex justify-between items-center border-b pb-2"
              >
                <Link
                  to={`/courses/${enrollment.courseId}`}
                  className="text-blue-600 hover:underline"
                >
                  {enrollment.courseTitle}
                </Link>

                <span className="text-sm text-gray-500">
                  {enrollment.progressPercent}% completed
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
