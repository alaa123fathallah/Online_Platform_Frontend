import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { confirmDelete } from "../../components/ConfirmDeleteToast";

function CourseLessons() {
  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = async () => {
    try {
      const res = await api.get(`/lessons/course/${courseId}`);
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to load lessons", err);
      toast.error("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const handleDeleteLesson = (lessonId) => {
    confirmDelete({
      message: "Delete this lesson?",
      onConfirm: async () => {
        try {
          await api.delete(`/lessons/${lessonId}`);
          setLessons((prev) => prev.filter((l) => l.id !== lessonId));
          toast.success("Lesson deleted");
        } catch {
          toast.error("Failed to delete lesson");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Lessons</h1>

        <Link
          to={`/instructor/courses/${courseId}/lessons/create`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Lesson
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <p className="text-gray-500">No lessons created yet.</p>
      ) : (
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {lesson.order}. {lesson.title}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {lesson.estimatedDuration} min
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to={`/instructor/lessons/${lesson.id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseLessons;
