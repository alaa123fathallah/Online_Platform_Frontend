import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { confirmDelete } from "../../components/ConfirmDeleteToast";

function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const quizRes = await api.get(`/quizzes/${quizId}`);
        setQuiz(quizRes.data);

        const qRes = await api.get(`/quizzes/${quizId}/questions`);
        setQuestions(qRes.data);
      } catch {
        toast.error("Failed to load quiz");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [quizId, navigate]);

  const save = async () => {
    try {
      await api.put(`/quizzes/${quizId}`, quiz);
      toast.success("Quiz updated");
    } catch {
      toast.error("Failed to update quiz");
    }
  };

  const del = () => {
    confirmDelete({
      message: "Are you sure you want to delete this quiz?",
      onConfirm: async () => {
        try {
          await api.delete(`/quizzes/${quizId}`);
          toast.success("Quiz deleted");
          navigate(-1);
        } catch {
          toast.error("Failed to delete quiz");
        }
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Quiz</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <input
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <button
            onClick={save}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>

          <button
            onClick={del}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Quiz
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Questions</h2>

        {questions.length === 0 ? (
          <p>No questions yet.</p>
        ) : (
          <ul className="space-y-3">
            {questions.map((q) => (
              <li
                key={q.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span>{q.questionText}</span>

                <Link
                  to={`/instructor/questions/${q.id}/edit`}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link
          to={`/instructor/quizzes/${quizId}/questions`}
          className="inline-block text-blue-600"
        >
          + Add Question
        </Link>
      </div>
    </div>
  );
}

export default EditQuiz;
