import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalStudents, setTotalStudents] = useState(0);
  const [publishedQuizzes, setPublishedQuizzes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await api.get("/courses/my");
        setCourses(coursesRes.data);

        // 🔹 Total students (backend already supports this)
        const studentsRes = await api.get("/enrollments/instructor/total");
        setTotalStudents(studentsRes.data.total);

        // 🔹 Published quizzes
        const quizzesRes = await api.get("/quizzes/instructor/published-count");
        setPublishedQuizzes(quizzesRes.data.total);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{courses.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Total Students</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "—" : totalStudents}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500">Published Quizzes</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "—" : publishedQuizzes}
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Courses</h2>

          <Link
            to="/instructor/create-course"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
                <span className="font-medium">{course.title}</span>

                {/* ✅ Better Manage Button */}
                <Link
                  to={`/instructor/courses/${course.id}/manage/lessons`}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-indigo-700"
                >
                  Manage
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;
