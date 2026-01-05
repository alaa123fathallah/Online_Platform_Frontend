import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/enrollments/my")
      .then(res => setEnrollments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const totalCompletedLessons = enrollments.reduce(
    (sum, e) => sum + e.completedLessons, 0
  );

  const avgProgress =
    enrollments.length === 0
      ? 0
      : Math.round(
          enrollments.reduce((s, e) => s + e.progressPercent, 0) /
          enrollments.length
        );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Enrolled Courses</h2>
          <p className="text-3xl font-bold mt-2">{enrollments.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Completed Lessons</h2>
          <p className="text-3xl font-bold mt-2">{totalCompletedLessons}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Average Progress</h2>
          <p className="text-3xl font-bold mt-2">{avgProgress}%</p>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>

        {loading ? (
          <p>Loading...</p>
        ) : enrollments.length === 0 ? (
          <p className="text-gray-500">No enrollments yet.</p>
        ) : (
          <ul className="space-y-3">
            {enrollments.map(e => (
              <li key={e.enrollmentId} className="flex justify-between border-b pb-2">
                <Link to={`/courses/${e.courseId}`} className="text-blue-600 hover:underline">
                  {e.courseTitle}
                </Link>
                <span className="text-sm text-gray-500">
                  {e.progressPercent}% completed
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
