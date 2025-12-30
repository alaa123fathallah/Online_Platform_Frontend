import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");

        // ONLY published courses
        const publishedCourses = res.data.filter(
          (c) => c.isPublished === true
        );

        setCourses(publishedCourses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold">Courses</h1>

      {/* Search bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Courses grid */}
      {loading ? (
        <p>Loading courses...</p>
      ) : filteredCourses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  {course.shortDescription}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {course.category} • {course.difficulty}
                </p>
              </div>

              <Link
                to={`/courses/${course.id}`}
                className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
