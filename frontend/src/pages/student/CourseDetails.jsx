import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import { getUserIdFromToken } from "../../utils/auth";

function CourseDetails() {
  const { id } = useParams();
  const userId = getUserIdFromToken();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // ✅ STUDENT-SAFE: fetch all published courses
        const coursesRes = await api.get("/courses");
        const foundCourse = coursesRes.data.find(
          c => c.id === Number(id)
        );

        if (!foundCourse) {
          setCourse(null);
          return;
        }

        setCourse(foundCourse);

        // Lessons
        const lessonsRes = await api.get(`/lessons/course/${id}`);
        setLessons(lessonsRes.data);

        // Enrollment check
        const enrollmentsRes = await api.get("/enrollments/my");
        const enrollment = enrollmentsRes.data.find(
          e => e.courseId === Number(id)
        );
        setIsEnrolled(!!enrollment);

        // Progress (only if enrolled)
        if (enrollment) {
          try {
            const progressRes = await api.get(
              `/progress/course/${id}/user/${userId}`
            );
            setProgress(progressRes.data);
          } catch {
            setProgress(null);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleEnroll = async () => {
    await api.post("/enrollments", {
      courseId: Number(id)
    });
    setIsEnrolled(true);
  };

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="space-y-6">
      {/* COURSE HEADER */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold">{course.title}</h1>

        <p className="text-gray-600 mt-2">
          {course.shortDescription}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {course.category} • {course.difficulty}
        </p>

        {/* PROGRESS */}
        {progress && (
          <div className="mt-4">
            <p className="text-sm font-medium">
              Progress: {progress.progressPercentage}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{
                  width: `${progress.progressPercentage}%`
                }}
              />
            </div>
          </div>
        )}

        {/* ENROLL BUTTON */}
        {!isEnrolled && (
          <button
            onClick={handleEnroll}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Enroll in Course
          </button>
        )}

        {/* CERTIFICATE */}
        {progress &&
          progress.progressPercentage === 100 &&
          progress.allQuizzesPassed && (
            <div className="mt-4">
              <Link
                to={`/certificate/${id}`}
                className="bg-green-600 text-white px-6 py-2 rounded inline-block"
              >
                View Certificate
              </Link>
            </div>
          )}
      </div>

      {/* LESSONS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Lessons
        </h2>

        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons yet.</p>
        ) : (
          <ul className="space-y-3">
            {lessons.map(lesson => (
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
