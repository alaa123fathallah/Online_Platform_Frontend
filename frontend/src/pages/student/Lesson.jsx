import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function Lesson() {
  const { id } = useParams();

  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // 🔹 Lesson
        const lessonRes = await api.get(`/lessons/${id}`);
        setLesson(lessonRes.data);

        // 🔹 Quiz for this lesson (may not exist)
        try {
          const quizRes = await api.get(`/quizzes/lesson/${id}`);
          setQuiz(quizRes.data);
        } catch {
          setQuiz(null); // no quiz is fine
        }
      } catch (err) {
        console.error("Failed to load lesson", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) return <p>Loading lesson...</p>;
  if (!lesson) return <p>Lesson not found.</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* LESSON CONTENT */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          {lesson.title}
        </h1>

        <div className="text-gray-700 whitespace-pre-line">
          {lesson.content}
        </div>
      </div>

      {/* QUIZ SECTION */}
      {quiz && (
        <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Quiz: {quiz.title}
            </h2>
            <p className="text-sm text-gray-500">
              Passing score: {quiz.passingScore}%
            </p>
          </div>

          <Link
            to={`/quiz/${quiz.id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Start Quiz
          </Link>
        </div>
      )}
    </div>
  );
}

export default Lesson;
