import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function CourseQuizzes() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get(`/quizzes/course/${courseId}`);
        setQuizzes(res.data);
      } catch (err) {
        console.error("Failed to load quizzes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [courseId]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Quizzes</h1>

        <Link
          to={`/instructor/courses/${courseId}/quizzes/create`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Quiz
        </Link>
      </div>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes created yet.</p>
      ) : (
        <ul className="space-y-3">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{quiz.title}</p>
                <p className="text-sm text-gray-500">
                  Passing score: {quiz.passingScore}%
                </p>
              </div>

              <div className="space-x-3">
                <Link
                  to={`/instructor/quizzes/${quiz.id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>

                {/* ✅ FIXED: CORRECT GRADING ROUTE */}
                <Link
                  to={`/instructor/quizzes/${quiz.id}/submissions`}
                  className="text-green-600 hover:underline text-sm"
                >
                  Grade
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseQuizzes;
