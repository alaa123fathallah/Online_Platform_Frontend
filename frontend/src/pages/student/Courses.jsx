import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/courses").then(res => setCourses(res.data));
  }, []);

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Courses</h1>

      <div className="bg-white p-4 rounded shadow">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(course => (
          <div key={course.id} className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{course.shortDescription}</p>
            <p className="text-xs text-gray-500 mt-1">
              {course.category} • {course.difficulty}
            </p>

            <Link
              to={`/courses/${course.id}`}
              className="block mt-4 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
