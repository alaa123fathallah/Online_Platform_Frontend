import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";

function Lesson() {
  const { id } = useParams(); // lessonId

  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load lesson
        const lessonRes = await api.get(`/lessons/${id}`);
        setLesson(lessonRes.data);

        // Load quiz linked to lesson (NEW BACKEND POINTER)
        try {
          const quizRes = await api.get(`/quizzes/lesson/${id}`);
          setQuiz(quizRes.data);
        } catch {
          setQuiz(null); // no quiz for this lesson
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!lesson) return <p>Lesson not found.</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative pb-20">
      {/* LESSON CONTENT */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          {lesson.title}
        </h1>

        <div className="whitespace-pre-line text-gray-700">
          {lesson.content}
        </div>
      </div>

      {/* CONTINUE TO QUIZ – BOTTOM RIGHT */}
      {quiz && (
        <Link
          to={`/quiz/${quiz.id}`}
          className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Continue to Quiz
        </Link>
      )}
    </div>
  );
}

export default Lesson;
