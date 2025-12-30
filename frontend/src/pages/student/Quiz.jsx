import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function Quiz() {
  const { id } = useParams(); // quizId
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error("Failed to load quiz", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      await api.post(`/quizzes/${id}/submit`, {
        answers: Object.entries(answers).map(([qid, value]) => ({
          questionId: Number(qid),
          selectedAnswerId: value.selectedAnswerId || null,
          textAnswer: value.textAnswer || null,
        })),
      });

      navigate(`/quiz/${id}/result`);
    } catch (err) {
      alert("Quiz submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>

      {quiz.questions.map((q) => (
        <div key={q.id} className="bg-white p-4 rounded shadow">
          <p className="font-medium mb-2">{q.text}</p>

          {/* MCQ */}
          {q.type === "MCQ" &&
            q.answers.map((a) => (
              <label key={a.id} className="block">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [q.id]: { selectedAnswerId: a.id },
                    })
                  }
                />
                <span className="ml-2">{a.text}</span>
              </label>
            ))}

          {/* Subjective */}
          {q.type === "Subjective" && (
            <textarea
              className="w-full border p-2"
              rows={4}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [q.id]: { textAnswer: e.target.value },
                })
              }
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {submitting ? "Submitting..." : "Submit Quiz"}
      </button>
    </div>
  );
}

export default Quiz;
