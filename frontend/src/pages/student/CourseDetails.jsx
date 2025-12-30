import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState(null);

  const progressPercent = 100;
  const isCompleted = progressPercent === 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const courseRes = await api.get(`/courses/${id}`);
        setCourse(courseRes.data);

        
        const lessonsRes = await api.get(`/lessons/course/${id}`);
        setLessons(lessonsRes.data);

        
        const enrollmentsRes = await api.get("/enrollments/my");
        setIsEnrolled(
          enrollmentsRes.data.some(e => e.courseId === Number(id))
        );
      } catch (err) {
        console.error("Failed to load course data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setError(null);

    try {
      await api.post("/enrollments", { courseId: Number(id) });
      setIsEnrolled(true);
    } catch (err) {
      setError("Enrollment failed.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold">{course.title}</h1>

        <p className="text-gray-600 mt-2">
          {course.shortDescription}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {course.category} • {course.difficulty}
        </p>

        
        <div className="mt-4">
          <p className="text-sm font-medium mb-1">
            Progress: {progressPercent}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        
        <button
          onClick={handleEnroll}
          disabled={isEnrolled || enrolling}
          className={`mt-4 px-6 py-2 rounded-md text-white ${
            isEnrolled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isEnrolled ? "Already Enrolled" : "Enroll in Course"}
        </button>

        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}

        
        {isCompleted && (
          <div className="mt-4">
            <Link
              to={`/certificate/${id}`}
              className="bg-green-600 text-white px-6 py-2 rounded-md inline-block"
            >
              View Certificate
            </Link>
          </div>
        )}
      </div>

      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>

        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons yet.</p>
        ) : (
          <ul className="space-y-3">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {lesson.order}. {lesson.title}
                </span>

                <Link
                  to={`/lessons/${lesson.id}`}  
                  className="text-blue-600 hover:underline"
                >
                  Start Lesson
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
